import mysql2 from "mysql2/promise";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "../config.js";

export const db = mysql2.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: 4,
  queueLimit: 0,
});

export async function bootstrapDB(app, port) {
  try {
    const [result, fields] = await db.execute("SELECT 1+1 as result");
    console.log(`Connection stablish`);
    app.listen(port, () =>
      console.log(`Example app listening on port ${port}!✨`),
    );
  } catch (error) {
    console.log(`Fail to connect on DB`);
    process.exit(1);
  }
}
