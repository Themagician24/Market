import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getProductBySlug = async (slug: string) => {
    // Implement your database query here
    const PRODUCT_BY_ID_QUERY = defineQuery (`
    *[
        _type == "product" && slug.current == $slug
    ] | order(name asc) [0]

    `);

    try {
        //Use sanityFetch to send the query with the slug as paremeter
        const product = await sanityFetch({
            query: PRODUCT_BY_ID_QUERY,
            params: {
                 slug ,
                },
        });
        //Return the product or an empty object if it doesn't exist
        return product.data || null;
        
    } catch (error) {
        console.error("Error fetching product by slug", error);
        return null;
        
    }
}