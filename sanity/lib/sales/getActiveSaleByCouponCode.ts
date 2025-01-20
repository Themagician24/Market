import { defineQuery } from "next-sanity";
import { CouponCode } from "./couponCodes";
import { sanityFetch } from "../live";

export const getActiveSaleCouponCode = async (couponCode: CouponCode) => {
    // Implement logic to fetch and validate the coupon code
    // Return the coupon code if valid, otherwise null or throw an error
    const ACTIVE_SALE_BY_COUPON_QUERY = defineQuery(`
    *[
        _type == "sale" &&
        isActive == true &&
        couponCode == $couponCode
    ] | order(validFrom desc) [0]
    
    `);

    try {
        const activeSale = await sanityFetch({
            query: ACTIVE_SALE_BY_COUPON_QUERY,
            params: { couponCode },
        });
        return activeSale ? activeSale.data : null;
        
    } catch (error) {
        console.error("Error fetching active sale coupon code", error);
        return null;
        
    }
};