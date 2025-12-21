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

export async function DELETE(req: Request) {
  try {
    const { product_id } = await req.json();

    await db.query(
      "DELETE FROM product WHERE product_id = ?",
      [product_id]
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, price, category, stock_quantity } = body;

    const [result]: any = await db.query(
      "INSERT INTO product (name, price, category, stock_quantity) VALUES (?, ?, ?, ?)",
      [name, price, category, stock_quantity]
    );

    return NextResponse.json({
      success: true,
      product: {
        product_id: result.insertId,
        name,
        price,
        category,
        stock_quantity,
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}



