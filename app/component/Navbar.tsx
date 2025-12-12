"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { GiHamburgerMenu } from "react-icons/gi";
interface Employee {
  id: number;
  name: string;
  salary: number;
  gender: string;
  email: string;
  position: string;
  city: string;
}

export default function Mynavbar() {
const [navbar, setnavbar] = useState(false);

  const buttonstate_Flip = () => {
    setnavbar(!navbar);
  };
return(<>
<header className="bg-[#f8f9fa] shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between p-2">
        <div className="logo w-24 md:w-32 object-cover rounded-lg">
          <Image
            src={"/store-logo.png"}
            width={208}
            height={50}
            alt="visa website logo"
          />
        </div>

        <nav className="hidden md:flex space-x-6 text-[16px] font-light  text-blue-800 animate-slide-in-down">
          <ul className="flex lg:space-x-7 text-base md:space-x-6  ">
            <Link href={"/"}>
              <li className="hover:scale-110 hover:text-green-700 transition-all cursor-pointer">
                Home
              </li>
            </Link>
            <Link href={"/products"}>
              <li className="cursor-pointer hover:text-green-700 hover:scale-110 transition-all">
                Products
              </li>
            </Link>
            <Link href={"/cart"}>
              <li className="cursor-pointer hover:text-green-700 hover:scale-110 transition-all">
                Add to cart
              </li>
            </Link>
            <Link href={"/admin_panel"}>
              <li className="cursor-pointer hover:text-green-500 border relative -top-1 hover:border-green-500 text-white transition-all bg-green-600 hover:bg-gray-100 px-4 py-1 rounded-3xl ">
                Admin
              </li>
            </Link>
          
          </ul>
        </nav>

        <div className="flex justify-end p-4  md:hidden">
          <button onClick={buttonstate_Flip}>
            {navbar ? (
              <GiHamburgerMenu className="text-red-700 text-2xl" />
            ) : (
              <GiHamburgerMenu className="text-red-700 text-2xl" />
            )}
          </button>
        </div>
      </div>
      {navbar && (
        <nav className=" animate-slide-in-down font-serif p-4 text-base bg-[#f8f9fa] shadow-lg  text-sky-500 md:hidden">
          <ul className="flex flex-col gap-5 ">
            <Link href={"/"}>
              <li className="hover:text-green-600 hover:pl-2 transition-all">
                Home
              </li>
            </Link>
            <Link href={"/products"}>
              <li className="hover:text-green-600 hover:pl-2 transition-all">
                products
              </li>
            </Link>
            <Link href={"/cart"}>
              <li className="hover:text-green-600 hover:pl-2 transition-all">
                Cart
              </li>
            </Link>
            <Link href={"/admin_panel"}>
              <li className="hover:text-green-600 hover:pl-2 transition-all ">
                Admin
              </li>
            </Link>
                   </ul>
        </nav>
      )}
    </header>
</>)
}