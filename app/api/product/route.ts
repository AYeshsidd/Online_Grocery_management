// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function GET() {
//   try {
//     const [rows] = await db.query(`SELECT * FROM product`);
//     return NextResponse.json(rows);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Database error" }, { status: 500 });
//   }
// }


import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDB(); // ✅
    const [rows] = await db.query("SELECT * FROM product");
    return NextResponse.json(rows);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
