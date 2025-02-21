import ProductsView from "@/components/ProductsView";
import { getAllCategories } from "@/sanity/lib/products/getAllCategories";
import { getAllProducts } from "@/sanity/lib/products/getAllProducts";
import BlackFridayBanner from '../../components/BlackFridayBanner';


export const dynamic = "force-static";
export const revalidate = 60; 

export default async function Home() {
  const products = await getAllProducts();
  const categories = await getAllCategories();

// cache will expire after 10 seconds


  //  console.log(
  //   crypto.ramdomUID()
  //   .slice(0, 5) +
  //    `>>>Rerendered the home page cache with ${products.length} products and ${products.length} categories`);
   

  return (
   <div>
    <BlackFridayBanner />


      <div className="flex flex-col items-center justify-top min-h-screen bg-gray-100 p-4">
        <ProductsView products={products} categories={categories} />
      </div>

   </div>

   
  );
}
