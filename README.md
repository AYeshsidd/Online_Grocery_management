# 🛒 Online Grocery Management System

A robust, full-stack grocery management solution built with **Next.js**, **TypeScript**, and **MySQL**. This application bridges the gap between customer-facing retail and administrative inventory control, providing a seamless flow from product browsing to order fulfillment.

---

## 🚀 Technical Architecture

This project is architected as a modern Next.js application leveraging the **App Router** for both frontend views and backend API logic.

### **Core Tech Stack**
- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS (PostCSS 4)
- **State Management**: React Context API (Global Cart Orchestration)
- **Backend**: Next.js Serverless Routes
- **Database**: MySQL (Relational Schema)
- **Driver**: `mysql2/promise` with Singleton Connection Pattern

### **System Design & Data Flow**
1.  **Database Layer**: Uses a relational structure consisting of `product`, `customer`, `orders`, and `order_items` tables to ensure data integrity.
2.  **API Layer**: Server-side routes handle sensitive operations like order placement and inventory management, abstracting the SQL logic from the client.
3.  **State Layer**: A dedicated `CartProvider` manages the ephemeral shopping state, allowing for persistent cart logic as users navigate through the catalog.

---

## 🛠️ Key Features

### **1. Customer Experience**
- **Dynamic Product Catalog**: Real-time rendering of products fetched directly from MySQL.
- **Context-Aware Shopping Cart**: Add/remove products with instant subtotal calculations.
- **Stock Validation**: Visual indicators for "In Stock" vs "Out of Stock" items based on database levels.
- **Intelligent Checkout**: A streamlined process that identifies existing customers by email or creates new records automatically during order placement.

### **2. Admin Control Center**
- **Inventory Dashboard**: A centralized table to monitor all stock levels, prices, and categories.
- **Product Lifecycle Management**: 
  - **Create**: Modal-driven interface for adding new SKU data.
  - **Delete**: Secure deletion of products with administrative confirmation.
  - **Read**: Dynamic fetching using `force-dynamic` to ensure the dashboard always reflects the latest DB state.

---

## 🗄️ Database Schema

The system relies on a structured MySQL database. Key relationships include:
- **Customers**: Stores contact and delivery details.
- **Orders**: Links customers to their transactions with status tracking.
- **Order Items**: A junction table capturing specific product snapshots (price/quantity) at the time of purchase.

---

## ⚙️ Development Setup

### **Environment Variables**
To run this project, you will need to configure a `.env` file with the following MySQL credentials:

```env
DB_HOST=your_host
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_database_name
```

### **Installation**
1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```

---

## 📸 Application Screenshots

### 🏠 Homepage
![Homepage](./screenshots/homepage.png)

### 📦 Products Page
![Products Page](./screenshots/products.png)

### 🛒 Shopping Cart
![Shopping Cart](./screenshots/cart.png)

### 🛠️ Admin Panel
![Admin Panel](./screenshots/admin.png)

### ➕ Add / Edit Product Flow
![Product Form](./screenshots/product-form.png)

---

## 👨‍💻 Engineering Insights

- **Performance**: API routes utilize `force-dynamic` to bypass Next.js caching where real-time data accuracy is critical (e.g., Admin Panel and Product Fetching).
- **Type Safety**: The entire codebase is written in TypeScript, ensuring rigorous type checking for both API payloads and component props.
- **Modular Design**: UI components are decoupled (e.g., `ProductCard`, `Navbar`), making the system highly maintainable and easy to scale.
