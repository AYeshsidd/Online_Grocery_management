'use client'
import { useEffect, useState } from "react"

import Link from "next/link"

export default function Admin() {
const [products, setProducts] = useState([]);

// Fetch products when admin page loads
  useEffect(() => {
    fetch("/api/admin-control/manage_Products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

    const scrollSections = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

    return(
    <>
    <header className="flex justify-between  bg-green-500 text-white p-8 ">
        <h1 className="text-3xl font-extrabold ">Hello Admin!</h1>

        <nav className="hidden md:flex mx-14 text-green-600 font-medium bg-white p-2 rounded-xl">
          <ul className="flex text-base md:space-x-7">
            
              <li className="hover:scale-110 hover:text-green-700 transition-all cursor-pointer">
            <button onClick={() => scrollSections("products")}>Products</button>  </li>
              <li className="cursor-pointer hover:text-green-700 hover:scale-110 transition-all">
            <Link href={"/products"}>
                Orders
            </Link>
              </li>
              <li className="cursor-pointer hover:text-green-700 hover:scale-110 transition-all">
            <button onClick={() => scrollSections("reports")}>Reports</button>
               </li>
              <li className="cursor-pointer text-red-600 hover:scale-110 tracking-wider transition-transform">
                
            <Link href={"/"}>
                Logout
            </Link>
              </li>
          
          </ul>
        </nav>

    </header>


  <section id="products" className="p-14">
        <h2 className="text-3xl font-bold mb-6 text-blue-600">Products</h2>

        <table className="border w-full">
          <thead>
            <tr className="bg-blue-500 text-white text-left py-3 ">
              <th className="p-2">ID</th>
              <th className="p-2">Name</th>
              <th className="p-2">Price</th>
              <th className="p-2">Category</th>
              <th className="p-2">stock</th>
              <th className="px-10">Actions</th>
            </tr>
          </thead>

          <tbody>
            {products.map((p: any) => (
              <tr key={p.product_id} className="border-b">
                <td className="p-3">{p.product_id}</td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">Rs.{p.price}</td>
                <td className="p-2">{p.category}</td>
                <td className="p-2">{p.stock_quantity}</td>

                <td className="p-2 ">
                  <button className="mr-3 bg-blue-500 text-white px-2 py-1 rounded text-xs">
                    Edit
                  </button>

                  <button className="bg-red-500 text-white px-2 py-1 rounded text-xs">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>


<section id="orders" className="text-4xl p-64"> PRODUCww... </section>

<section id="reports" className="text-4xl p-64"> report ... </section>

    </>
    
)
}
