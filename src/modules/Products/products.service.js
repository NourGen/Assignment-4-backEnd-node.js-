import { db } from "../../DB/db.js";

export const createProduct = async (inputs) => {
  const { name, price, stock, s_id } = inputs;
  console.log({ name, price, stock, s_id });

  const getUserQuery = "SELECT * FROM suppliers WHERE SupplierID = ? ";
  const [match] = await db.execute(getUserQuery, [s_id]);
  if (!match?.length) {
    throw new Error("user not found", { cause: 404 });
  }

  const creatQuery =
    "INSERT INTO products( ProductName, Price, StockQuantity, SupplierID) VALUES (?,?,?,?)";
  const [data] = await db.execute(creatQuery, [name, price, stock, s_id]);
  return data;
};

export const productsList = async () => {
  const listQuery =
    "SELECT * FROM products as t1 LEFT JOIN suppliers as t2 on t1.SupplierID = t2.SupplierID ";
  const [data] = await db.execute(listQuery, []);
  //   console.log({ data });

  return data;
};

export const getOneProduct = async (params) => {
  const { id } = params;
  const findQuery =
    "SELECT * FROM products as t1 LEFT JOIN suppliers as t2 on t1.SupplierID = t2.SupplierID WHERE ProductID = ? ";
  const [data] = await db.execute(findQuery, [id]);
  if (!data?.length) throw new Error("product not found", { cause: 404 });
  return data;
};

export const updateProduct = async (inputs, params) => {
  const { id } = params;
  const { name, price, stock, s_id } = inputs;

  const findQuery =
    "SELECT * FROM products as t1 LEFT JOIN suppliers as t2 on t1.SupplierID = t2.SupplierID WHERE ProductID = ? ";
  const [match] = await db.execute(findQuery, [id]);
  if (!match?.length) throw new Error("product not found", { cause: 404 });

  const updateQuery =
    "UPDATE products SET ProductName=?,Price=?,StockQuantity=?,SupplierID =? WHERE ProductID = ?";
  const [data] = await db.execute(updateQuery, [name, price, stock, s_id, id]);

  return data;
};

export const deleteProduct = async (params) => {
  const { id } = params;

  const findQuery =
    "SELECT * FROM products as t1 LEFT JOIN suppliers as t2 on t1.SupplierID = t2.SupplierID WHERE ProductID = ? ";
  const [match] = await db.execute(findQuery, [id]);
  if (!match?.length) throw new Error("product not found", { cause: 404 });

  const deleteQuery = "DELETE FROM products WHERE ProductID = ? ";
  const [data] = await db.execute(deleteQuery, [id]);

  return data;
};

// Create a reporting endpoint to retrieve the product with the highest stock quantity
export const highestStock = async () => {
  const highestStockQuery =
    "SELECT MAX(StockQuantity),ProductName,ProductID,Price FROM Products;";
  const [data] = await db.execute(highestStockQuery, []);

  return data;
};

/*
Create a reporting endpoint to retrieve all sales including: (0.5 Grade)  
●  Product name 
●  Quantity sold 
●  Sale date using SQL JOIN operations.
*/
export const productReport = async () => {
  const reportQuery =
    "SELECT p.ProductName , s.Quantitysold FROM products as p INNER JOIN sales as s on p.ProductID = s.ProductID;";
  const [data] = await db.execute(reportQuery);
  return data;
};
