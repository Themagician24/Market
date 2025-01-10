import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name:"sale",
    title: "Sale",
    type: "document",
    icon: TagIcon,
    fields: [
        defineField({
            name: "title",
            type: "string",
            title: "Sale Title",
        }),
        defineField({
            name:"description",
            type: "text",
            title: "Sale Description",
        }),
        defineField({
            name:"discountAmount",
            type: "number",
            title: "Discount Amount (%)",
            description: "Amount off in percentage or fixed value",
        }),
        defineField({
            name:"couponCode",
            type: "string",
            title: "Coupon Code",
            description: "Optional coupon code for the sale",
        }),
        defineField({
            name: "validFrom",
            type: "datetime",
            title: "Valid Until",
        }),
        defineField({
            name:"isActive",
            type: "boolean",
            title: "Is Active",
            description: "Toggle to activate/deactivate the sale",
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title:"title",
            discountAmount:"discountAmount",
            couponCode:"couponCode",
            isActive:"isActive",
            validFrom:"validFrom",
        },
        prepare(selection) {
            const {title, discountAmount, couponCode, isActive, validFrom} = selection;
            const status = isActive ? "active" : "Inactive";
            return {
                title,
                subtitle: ` ${discountAmount}% off -Code ${couponCode? `Coupon: ${couponCode}` : ""} - ${isActive? "Active" : "Inactive"} - Valid Until: ${validFrom.toLocaleString()}`,
            }
        }
    }
        
});