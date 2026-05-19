'use client'
import { useEffect, useState } from "react"
import Link from "next/link"

interface Product {
  product_id: number;
  name: string;
  price: number;
  category: string;
  stock_quantity: number;
}

export default function Admin() {
const [products, setProducts] = useState([]);
const [showModal, setShowModal] = useState(false);

// Fetch products when admin page loads
  useEffect(() => {
    fetch("/api/admin-control/manage_Products")
      .then(res => res.json())
      .then(data => setProducts(data));
  }, []);

  // scrolling
  const scrollSections = (id: string) => {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

// my delete function
const deleteProduct = async (id: number , name:string) => {
  const confirmDelete = confirm(`Are you sure to delete ${name} ?`);
  if (!confirmDelete) return;

  await fetch("/api/admin-control/manage_Products", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ product_id: id }),
  });

  // Refresh product list after delete
  setProducts(products.filter((p: any) => p.product_id !== id));
};

// Create function
const addProducts = async () => {
  const name = (document.getElementById("name") as HTMLInputElement).value;
  const price = (document.getElementById("price") as HTMLInputElement).value;
  const category = (document.getElementById("category") as HTMLInputElement).value;
  const stock = (document.getElementById("stock") as HTMLInputElement).value;

  if (!name || !price || !category || !stock) {
    alert("All fields are required");
    return;
  }

  const res = await fetch("/api/admin-control/manage_Products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,
      price,
      category,
      stock_quantity: stock,
    }),
  });

  const data = await res.json();

  if (data.success) {
    // setProducts([...products, data.product]);
    setShowModal(false);
  }
};

    return(
    
    <div className="bg-[#f8f9fa]">

     <header className="bg-teal-600 text-white shadow-md mb-12 md:mb-1">
      <div className="max-w-7xl mx-auto flex justify-between items-center py-4 px-6">
      
        <h1 className="md:text-3xl font-extrabold tracking-tight">
          Hello Admin!
        </h1>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-8 bg-white text-teal-600 font-serif rounded-lg p-2 ">
          <button
            onClick={() => scrollSections("products")}
            className="px-3 py-2 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-200"
          >
            Products
          </button>
          <Link
            href={"/products"}
            className="px-3 py-2 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-200"
          >
            Orders
          </Link>
          <button
            onClick={() => scrollSections("reports")}
            className="px-3 py-2 rounded hover:bg-gray-200 cursor-pointer transition-colors duration-200"
          >
            Reports
          </button>
          <Link
            href={"/"}
            className="px-3 py-2 rounded hover:bg-red-500 bg-red-600 text-white transition-colors duration-200 font-semibold"
          >
            Logout
          </Link>

        </nav>
        </div>
    </header>


  <section id="products" className="md:p-14 text-gray-700">
        <div className="flex justify-between">
        <h2 className="md:text-3xl text-2xl font-bold mb-6 text-gray-600 px-2 ">Products</h2>
        <button onClick={() => setShowModal(true)} className="mr-3 md:mb-3 mb-5 bg-teal-600 text-sm  hover:bg-green-800 text-white md:p-2 rounded-lg p-1 md:text-base cursor-pointer">
            Add new product
          </button>
        </div>

        <table className="border w-full text-[9px] lg:text-base">
          <thead>
            <tr className="bg-gray-600 text-white text-left py-3 ">
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

                <td className="md:p-2">
                  
                  <button className="mr-3 bg-blue-500 text-white px-1 md:text-xs md:px-2 py-1 rounded text-[8px] cursor-pointer">
                    Update
                  </button>

                  <button onClick={() => deleteProduct(p.product_id, p.name)} className="bg-red-500 text-white px-1 md:text-xs md:px-2 py-1 rounded text-[8px] cursor-pointer hover:scale-110 hover:transition-all ease-in-out">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </section>

      {/* UPDATE MODAL  */}
      
{showModal && (
  <div className="fixed inset-0  bg-gray-200 flex items-center justify-center z-50">
    
    <div className="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 className="text-xl font-bold mb-4 text-green-700">
        Add New Product
      </h2>

      <input
        id="name"
        placeholder="Product Name"
        className="border border-gray-400 p-2 w-full mb-3 text-gray-600"
      />

      <input
        id="price"
        type="number"
        placeholder="Price"
        className="border p-2 w-full mb-3 text-gray-600"
        />

      <input
        id="category"
        placeholder="Category"
        className="border p-2 w-full mb-3 text-gray-600"
        />

      <input
        id="stock"
        type="number"
        placeholder="Stock Quantity"
        className="border p-2 w-full mb-4 text-gray-600"
        />

      <div className="flex justify-between">
        <button
          onClick={addProducts}
          className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
          >
          Save
        </button>

        <button
          onClick={() => setShowModal(false)}
          className="bg-gray-700 cursor-pointer px-2 rounded hover:scale-105 transition"
          >
          Cancel
        </button>
      </div>
    </div>

  </div>
)}

</div>
    
    
  )
}
