'use client'
import { useCart } from "../context/card_context";
import Link from "next/link";
import { MdDelete } from "react-icons/md";
import Mynavbar from "../component/Navbar";

export default function CartPage() {
  const { cart } = useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);


  const handlePlaceOrder = async () => {
  const customer_name = prompt("Enter your name:");
  const customer_email = prompt("Enter your email:");
  const customer_address = prompt("Mention your House address:");
  const customer_phone = prompt("Enter your active Mobile number:");

  const res = await fetch("/api/place-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ customer_name, customer_email, customer_phone, customer_address, cart, total }),
  });

  const data = await res.json();
  if (data.success) {
    alert(`Order Placed! Your Order ID is ${data.order_id}`);
    // Optional: clear cart
  } else {
    alert("Failed to place order: " + data.message);
  }
};
  return (
    <>
      <Mynavbar/>
    <main className="md:p-6">
      <h1 className="text-3xl font-extrabold mt-5 text-center  text-green-600">Shopping Cart</h1>
      {cart.length === 0 ? (
      <div>
        <p className="text-center mt-12 text-gray-400 text-sm">You have no items in your shopping cart <br />Click here to continue shopping.</p>
        </div>
      ) : (
        <section className="md:px-4 px-3">
           <div className="grid grid-cols-5 mt-12 border-b border-gray-400  py-4 md:text-base text-xs font-bold text-center"> 
            <span>Name</span>
            <span>Price</span>
            <span>Quantity</span>
            <span>Subtotal</span>
            <span>Remove</span>
            </div>
         
        {cart.map((item) => (
                      
            <div key={item.product_id} className="text-center grid grid-cols-5 border-gray-200 border-b items-center py-2 text-gray-500 md:text-base text-xs ">
             <span>
               {item.name} 
             </span>

             <span>
               {item.price} 
             </span>
            
            <span >
               {item.quantity} 
             </span>
            

            <span >
               {item.price * item.quantity} 
             </span>
            
             <span><MdDelete className="text-red-600 cursor-pointer hover:scale-125 inline-block"/></span>
          </div>
           
        ))}
        <div className="p-3 md:mx-12 mt-16 bg-gray-200 shadow-xl rounded-lg border-black border md:max-w-sm ">
<h3 className="text-2xl font-light text-gray-600 border-b border-black text-center py-2">Order summary</h3>
         <aside className="text-xl  mx-3 font-bold mt-5 mb-5">Total: Rs. {total}</aside> 
         
         <Link href="/products">
  <button className="w-full font-medium md:px-2 py-1 text-base border bg-teal-600 hover:bg-gray-200 text-center hover:text-black text-white rounded-lg cursor-pointer hover:transition-all  ">
   ⬅ Continue to Shopping 
  </button>
</Link>
<br />
 
  <button onClick={handlePlaceOrder} className="w-full font-medium md:px-2 py-1 border border-b  text-white rounded-lg cursor-pointer bg-blue-500 hover:text-blue-500 hover:bg-gray-200 transition-all mt-5 mb-4 ">
   🧾 Place My Order
  </button>
        </div>

</section>
        
             )}
        </main>
    </>
  )}

