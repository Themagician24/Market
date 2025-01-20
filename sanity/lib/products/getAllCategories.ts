import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";


export const getAllCategories = async () =>{
    const ALL_CATEGORIES_QUERY = defineQuery(`
    *[
        _type == "category"

    ] | order(name asc)
    `);

// Utilisation de sanityFetch pour envoyer les requetes
    try {
        const categories = await sanityFetch({
            query: ALL_CATEGORIES_QUERY,
        });
   //REtournons la liste des categories ou alors un tableau vide si nous trouvons aucune categorie
   return categories.data || [];     
        
    } catch (error) {
        console.error("Error fetching categories", error);
        return [];
        
    }
    
}