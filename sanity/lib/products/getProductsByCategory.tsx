import { defineQuery } from "next-sanity"
import { sanityFetch } from "../live";

export const getProductsByCategory = async (categorySlug: string) => {
    const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(`
    *[
       _type == "product" && references(*[_type == "category" && slug.current == $categorySlug]._id)
    ] | order(name asc)
    `);

    try {
        // Use sanityFetch to send the query with the category slug as parameter
        const products = await sanityFetch({
            query: PRODUCTS_BY_CATEGORY_QUERY,
            params: {
                categorySlug,
            },
        });
        return products.data || [];

    } catch (error) {
        console.error("Error fetching products by category:", error);
        return [];
    }

    // You can return the fetched products here as a result

    // Example:
    // return products;

    // Or, you can use the fetched products in your Next.js components
    // return { props: { products } };

    // Example:
    // return { props: { products: fetchedProducts } };

    // Or, you can use the fetched products in your Next.js page
    // return { props: { products: fetchedProducts } };

    // Example:
    // return { props: { products: fetchedProducts } };
}