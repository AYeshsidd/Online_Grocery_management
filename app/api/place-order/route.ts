// import { NextResponse } from "next/server";
// import { db } from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const { customer_name, customer_email, customer_phone, customer_address, cart, total } = await req.json();

//     if (!cart || cart.length === 0) {
//       return NextResponse.json({ success: false, message: "Cart is empty" });
//     }

//     // 1️⃣ Check if customer already exists
//     const [existingCustomer]: any = await db.query(
//       "SELECT customer_id FROM customer WHERE email = ?",
//       [customer_email]
//     );

//     let customerId;
//     if (existingCustomer.length > 0) {
//       customerId = existingCustomer[0].customer_id;
//     } else {
        
//       // 2️⃣ Insert new customer
//       const [custResult]: any = await db.query(
//         "INSERT INTO customer (name, email, phone, address) VALUES (?, ?, ?, ?)",
//         [customer_name, customer_email, customer_phone, customer_address]
//       );
//       customerId = custResult.insertId;
//     }

//     // 3️⃣ Insert order linked to this customer
//     const [orderResult]: any = await db.query(
//       "INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, 'Pending')",
//       [customerId, total]
//     );
//     const orderId = orderResult.insertId;

//     // 4️⃣ Insert all ordered items
//     for (const item of cart) {
//       await db.query(
//         "INSERT INTO order_items (order_id, product_id, product_name, quantity, subtotal) VALUES (?, ?, ?, ?, ?)",
//         [orderId, item.product_id, item.name, item.quantity, item.price * item.quantity]
//       );

//     }

//     return NextResponse.json({
//       success: true,
//       message: "Order placed successfully!",
//       order_id: orderId,
//     });

//   } catch (error: any) {
//     console.error("❌ Error placing order:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to place order.", error: error.message },
//       { status: 500 }
//     );
//   }

// }

import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const db = await getDB(); // ✅ YAHI MAIN FIX

    const {
      customer_name,
      customer_email,
      customer_phone,
      customer_address,
      cart,
      total
    } = await req.json();

    if (!cart || cart.length === 0) {
      return NextResponse.json({ success: false, message: "Cart is empty" });
    }

    const [existingCustomer]: any = await db.query(
      "SELECT customer_id FROM customer WHERE email = ?",
      [customer_email]
    );

    let customerId;
    if (existingCustomer.length > 0) {
      customerId = existingCustomer[0].customer_id;
    } else {
      const [custResult]: any = await db.query(
        "INSERT INTO customer (name, email, phone, address) VALUES (?, ?, ?, ?)",
        [customer_name, customer_email, customer_phone, customer_address]
      );
      customerId = custResult.insertId;
    }

    const [orderResult]: any = await db.query(
      "INSERT INTO orders (customer_id, total_amount, status) VALUES (?, ?, 'Pending')",
      [customerId, total]
    );
    const orderId = orderResult.insertId;

    for (const item of cart) {
      await db.query(
        "INSERT INTO order_items (order_id, product_id, product_name, quantity, subtotal) VALUES (?, ?, ?, ?, ?)",
        [orderId, item.product_id, item.name, item.quantity, item.price * item.quantity]
      );
    }

    return NextResponse.json({
      success: true,
      message: "Order placed successfully!",
      order_id: orderId,
    });

  } catch (error: any) {
    console.error("❌ Error placing order:", error);
    return NextResponse.json(
      { success: false, message: "Failed to place order.", error: error.message },
      { status: 500 }
    );
  }
}







// import { NextResponse } from "next/server";
// import { db } from "@/lib/db"; // ✅ connection instance

// export async function POST(req: Request) {
//   try {
//     const { customer, cart } = await req.json();

//     // Validate
//     if (!cart || cart.length === 0) {
//       return NextResponse.json({ success: false, message: "Cart is empty" });
//     }

//     // 1️⃣ Insert or find existing customer
//     const [existing]: any = await db.query(
//       "SELECT customer_id FROM customer WHERE email = ?",
//       [customer.email]
//     );

//     let customerId;
//     if (existing.length > 0) {
//       customerId = existing[0].customer_id;
//     } else {
//       const [custResult]: any = await db.query(
//         "INSERT INTO customer (name, email, phone, address) VALUES (?, ?, ?, ?)",
//         [customer.name, customer.email, customer.phone, customer.address]
//       );
//       customerId = custResult.insertId;
//     }

//     // 2️⃣ Calculate total amount
//     const totalAmount = cart.reduce(
//       (sum: number, item: any) => sum + item.price * item.quantity,
//       0
//     );

//     // 3️⃣ Insert order record
//     const [orderResult]: any = await db.query(
//       "INSERT INTO orders (customer_id, order_date, total_amount, status) VALUES (?, NOW(), ?, 'Pending')",
//       [customerId, totalAmount]
//     );
//     const orderId = orderResult.insertId;

//     // 4️⃣ Insert order items
//     for (const item of cart) {
//       await db.query(
//         "INSERT INTO order_items (order_id, product_id, quantity, subtotal) VALUES (?, ?, ?, ?)",
//         [orderId, item.product_id, item.quantity, item.price * item.quantity]
//       );

//       // 🧾 Optional: reduce stock in product table
//       await db.query(
//         "UPDATE product SET stock_quantity = stock_quantity - ? WHERE product_id = ?",
//         [item.quantity, item.product_id]
//       );
//     }

//     return NextResponse.json({
//       success: true,
//       message: "Order placed successfully!",
//       orderId,
//     });
//   } catch (error: any) {
//     console.error("❌ Error placing order:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to place order.", error: error.message },
//       { status: 500 }
//     );
//   }
// }
