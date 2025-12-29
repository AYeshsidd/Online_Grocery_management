// import mysql from "mysql2/promise";

// export const db = await mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
// });


import mysql from "mysql2/promise";

let connection: mysql.Connection | null = null;

export async function getDB() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST!,
      user: process.env.DB_USER!,
      password: process.env.DB_PASSWORD!,
      database: process.env.DB_NAME!,
    });
  }
  return connection;
}
