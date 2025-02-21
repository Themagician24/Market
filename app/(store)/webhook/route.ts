import stripe from "@/lib/stripe";

import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { metadata } from '../layout';
import { Metadata } from "@/actions/createCheckoutSession";
import { backendClient } from "@/sanity/lib/backendClient";

export async function POST(req: NextRequest) {
    const body = await  req.text();
    const headerList =await headers();
    const sig = headerList.get("stripe-signature");


    if (!sig) {
        return NextResponse.json({ error: "No signature"}, { status: 400});
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.log(" stripe webhook secret is not set");
        return NextResponse.json(
            { error: "Missing webhook secret"},
             { status: 400}
             );
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (error) {
        console.error("webhook signature verification failed:", error);
        return NextResponse.json(
            { error: `Invalid signature: ${error}` },
            { status: 400}
        );
    }

    if (event.type === "checkout.session.completed") {
        // Process the completed checkout session
        const session = event.data.object as Stripe.Checkout.Session;

        try {
            const order = await createOrderInSanity(session);
            console.log("Order created in Sanity:", order);
        } catch (error) {
            console.error("Error creating order in Sanity:", error);
            return NextResponse.json(
                { error: `Failed to create order: ${error}` },
                { status: 500}
            );
        }
    }

    return NextResponse.json({ received: true});

}

async function createOrderInSanity(session: Stripe.Checkout.Session) {
    const {
        id,
        amount_total,
        currency,
        metadata,
        payment_intent,
        customer,
        total_details, 
    } = session;

    const {orderNumber, customerName, customerEmail, clerkUserId}
     = metadata as Metadata;


     const lineItemsWithProduct = await stripe.checkout.sessions.listLineItems(
        id,
        {
            expand: ["data.price.product"],
        }
     );

     const sanityProducts = lineItemsWithProduct.data.map((item) => ({
        _key : crypto.randomUUID(),
        product: {
            _type: "reference",
            _ref: (item.price?.product as Stripe.Product)?.metadata?.id,
        },
        quantity: item.quantity || 0,
     }));


     const order = await backendClient.create({
        _type: "order",
        orderNumber,
        stripeCheckoutSessionId:id,
        stripeCustomerId: customer,
        stripePaymentIntentId: payment_intent,
       customerName,
       clerkUserId: clerkUserId,
       email: customerEmail,
       currency,
       amountDiscount: total_details?.amount_discount ? total_details.amount_discount / 100 : 0,
       products: sanityProducts,
       totalPrice: amount_total ? amount_total / 100 : 0,
       status: "paid",
       orderDate: new Date().toISOString(),
      });
        
   
     return order;
}

