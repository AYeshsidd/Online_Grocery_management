"use client";
import Image from "next/image";
import Mynavbar from "./component/Navbar";

interface data {
  id: number;
  name: string;
  salary: number;
  gender: string;
  email: string;
  position: string;
  city: string;
}

export default function HomePage() {
return(
<div className="bg-[#f8f9fa]">

<Mynavbar/>
<section className=" mt-12 md:mx-12 mx-4 space-y-7 ">
  <h1 className="md:text-4xl text-green-600 max-w-2xl font-extrabold tracking-wide">Welcome to Online Grocery Management Software</h1>
  <p className="mt-5 text-gray-400 text-lg max-w-4xl font-serif">Take full control of your e-shop with our online grocery store management software, the ideal tool for managing your online store effectively. Our admin panel allows you to...
</p>
<ul className="mt-4 md:text-lg text-gray-500 font-light">
  <li>✔ Manage stocks with category</li>
  <li>✔ View and manage all products</li>
  <li>✔ Check orders efficently </li>
</ul>

 <Image
    src="/hero-section.jpg"
    alt="Manage store efficiently"
    width={1000}     
    height={800}
    className=" md:h-[500px] rounded-md mb-4 brightness-105 "
    />
</section>
</div>
)
}
