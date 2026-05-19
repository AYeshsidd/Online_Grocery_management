import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDB(); // ✅
    const [rows] = await db.query("SELECT * FROM product");
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: "DB Error" }, { status: 500 });
  }
}
