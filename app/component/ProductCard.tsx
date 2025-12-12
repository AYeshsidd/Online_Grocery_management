


// "use client";
// import Image from "next/image";
// import { LuCirclePlus } from "react-icons/lu";
// import { MdDelete } from "react-icons/md";
// import { useCart } from "../context/card_context";

// export default function ProductCard({ product }: { product: any }) {
//   const { cart, addToCart, removeFromCart } = useCart();

//   // Find current product quantity from global cart
//   const cartItem = cart.find((item: any) => item.id === product.product_id);
//   const quantity = cartItem ? cartItem.quantity : 0;

//   return (
//     <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition duration-300">
//       <div className="relative h-48 w-full">
//         <Image
//           src={`/${product.image_url}` || "/placeholder.png"}
//           alt={product.name}
//           fill
//           className="object-cover"
//         />
//       </div>

//       <div className="p-4">
//         <h2 className="font-semibold text-lg text-gray-800 truncate">
//           {product.name}
//         </h2>
//         <p className="text-gray-500 text-sm mb-2">{product.category}</p>
//         <p className="text-xl font-bold text-gray-900 mb-2">
//           Rs. {product.price}
//         </p>
//         <p
//           className={`${
//             product.stock_quantity > 0 ? "text-green-600" : "text-red-500"
//           } font-medium`}
//         >
//           {product.stock_quantity > 0
//             ? `${product.stock_quantity} in stock`
//             : "Out of stock"}
//         </p>

//         <div className="flex items-center mt-3 space-x-4">
//           <button
//             onClick={() => addToCart(product)}
//             className="flex items-center text-gray-400 rounded-xl"
//           >
//             <LuCirclePlus className="text-xl hover:text-green-600 text-black cursor-pointer font-bold" />
//             <span className="mx-2">
//               {quantity > 0 ? `${quantity} in Cart` : "Add to Cart"}
//             </span>
//           </button>

//           {quantity > 0 && (
//             <button
//               onClick={() => removeFromCart(product.product_id)}
//               className="text-gray-400"
//             >
//               <MdDelete className="text-xl hover:text-red-600 text-red-800 cursor-pointer font-bold" />
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }





"use client";
import Image from "next/image";
import Link from "next/link";
import { LuCirclePlus } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import { useCart } from "../context/card_context"; // 👈 adjust path if needed
import { useState } from "react";

export default function ProductCard({ product }: { product: any }) {
  const { addToCart, removeFromCart } = useCart();
  const [quantity ,setQuantity] = useState(0);

  const addproduct = () =>{
     setQuantity(quantity+1) 
}

const deleteproduct = () => {
  setQuantity(quantity-1)
}

  return (
    <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition duration-300">
      <div className="relative h-48 w-full">
        <Image
          src={`/${product.image_url}` || "/placeholder.png"}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800 truncate">
          {product.name}
        </h2>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="text-xl font-bold text-gray-900 mb-2">
          Rs. {product.price}
        </p>
        <p
          className={`${
            product.stock_quantity > 0 ? "text-green-600" : "text-red-500"
          } font-medium`}
        >
          {product.stock_quantity > 0
            ? `${product.stock_quantity} in stock`
            : "Out of stock"}
        </p>

        <div className="flex items-center mt-2 space-x-4">
          <button
            onClick={() => {
              addToCart(product)
              addproduct()
            }}
            className="flex items-center text-gray-400 rounded-xl"
          >
            <LuCirclePlus className="text-xl hover:text-green-600 text-black cursor-pointer font-bold" />
            <span className="mx-2">Added {quantity}</span>
          </button>

          {/* <button
            onClick={addproduct} 
            className="flex items-center text-gray-400 rounded-xl"
          >
            <LuCirclePlus className="text-xl hover:text-green-600 text-black cursor-pointer font-bold" />
            <span className="mx-2">{quantity}</span>
          </button> */}


          <button
            onClick={() => {
              removeFromCart(product.product_id)
              deleteproduct()
            }}
            className="text-gray-400"
          >
            <MdDelete className="text-xl hover:text-red-600 text-red-800 cursor-pointer font-bold" />
          </button>
        </div>
      </div>
    </div>
  );
}






// LOCAL HOOKS THIS WILL NOT FETCH PRODUCTS DATA TO CART 
// "use client";
// import Image from "next/image";
// import { useState } from "react";
// import Link from "next/link";
// import { LuCirclePlus } from "react-icons/lu";
// import { MdDelete } from "react-icons/md";

// export default function ProductCard({ product }: { product: any }) {
  
//   const [quantity ,setQuantity] = useState(0);

//   const addproduct = () =>{
//      setQuantity(quantity+1) 
// }

// const deleteproduct = () => {
//   setQuantity(quantity-1)
// }

//   return (
//     <div className="bg-white shadow-lg rounded-2xl overflow-hidden hover:scale-105 transition duration-300">
//       <div className="relative h-48 w-full">
//         <Image
//           src={`/`+ product.image_url || "/placeholder.png"}
//           alt={product.name}
//           fill
//           className="object-cover "
//         />
//       </div>
//       <div className="p-4">
//         <h2 className="font-semibold text-lg text-gray-800 truncate">
//           {product.name}
//         </h2>
//         <p className="text-gray-500 text-sm mb-2">{product.category}</p>
//         <p className="text-xl font-bold text-gray-900 mb-2">
//           Rs. {product.price}
//         </p>
//         <p
//           className={`${
//             product.stock_quantity > 0 ? "text-green-600" : "text-red-500"
//           } font-medium`}
//         >
//           {product.stock_quantity > 0
//             ? `${product.stock_quantity} in stock`
//             : "Out of stock"}
//         </p>
        
// <div className="flex">
//         <button onClick={addproduct} className="flex mt-2 text-gray-400 rounded-xl ">
//           <LuCirclePlus className="text-xl hover:text-green-600 text-black cursor-pointer font-bold relative right- "/>
       
//        {/* MEMORIZE THIS */}
//        {quantity > 0 && (
//          <span className="mx-3 transition transform duration-500">{quantity} Added in cart  </span>
//         )}

// </button>
//         <button onClick={deleteproduct} className="text-gray-400  ">
//         {quantity >=1 && (
//           <span className="transition transform duration-500 mx-5"> 
//              <MdDelete className="text-xl hover:text-red-600 text-red-800 cursor-pointer font-bold relative -top-4 "/> 
//             </span>
//         )}
//         </button>
//         </div>

//       </div>
//     </div>
//   );
// }

