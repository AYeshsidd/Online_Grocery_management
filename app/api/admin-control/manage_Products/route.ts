import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  try {
    const [rows] = await db.query("SELECT * FROM product");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
