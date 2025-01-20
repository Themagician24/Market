import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";


export const getAllProducts = async () =>{
    const ALL_PRODUCTS_QUERY = defineQuery(`
    *[
        _type == "product"

    ] | order(name asc)
    `);

// Utilisation de sanityFetch pour envoyer les requetes
    try {
        const products = await sanityFetch({
            query: ALL_PRODUCTS_QUERY,
        });
   //REtournons la liste des produits ou alors un tableau vide si nous trouvons aucun produit
   return products.data || [];     
        
    } catch (error) {
        console.error("Error fetching products", error);
        return [];
        
    }
    
}