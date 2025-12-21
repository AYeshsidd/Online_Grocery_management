import Mynavbar from "../component/Navbar";
import ProductCard from "../component/ProductCard";

async function getProducts() {
  // Replace with your actual API endpoint or DB route
  const res = await fetch("http://localhost:3000/api/product", {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <>
      <Mynavbar/>
    <section className="min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-6 ">
        <h1 className="md:text-3xl text-xl font-extrabold text-green-600 mb-8 text-center">
          🛍️ Available Products
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product: any) => (
            <ProductCard key={product.product_id} product={product} />
          ))}
        </div>
      </div>
    </section>
    </>
  );
}
