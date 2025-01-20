import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const searchProductsByName = async (searchParam: string) => {
    const PRODUCT_SEARCH_QUERY = defineQuery (`
    *[
        _type == "product" &&
        name match $searchParam
    ] | order(name asc)
    
    `);
    try {
         //Use sanityfetch to send the query and pass the Serach parameter with a wilcard
         const products = await sanityFetch ({
            query: PRODUCT_SEARCH_QUERY,
            params: {
                 searchParam: `*${searchParam}*`//Append wildcard for partial match
                 },
        });
        //Return the fetched products or an empty array if no products are found
        return products.data || [];
        
    } catch (error) {
        console.error("Error fetching products by name", error);
        return [];
        
    }
   

};