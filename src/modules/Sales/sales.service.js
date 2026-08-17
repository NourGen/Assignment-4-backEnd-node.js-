import { db } from "../../DB/db.js";

export const saleRecord = async (inputs) => {
  const { p_id, quantitySold } = inputs; //p_id       quantitySold sale_date

  const checkProduct = "SELECT * FROM products WHERE ProductID = ?";
  const [check] = await db.execute(checkProduct, [p_id]);
  if (!check?.length) {
    throw new Error("Product Not found", { cause: 404 });
  }
  const recordQuery = "INSERT INTO sales(ProductID, QuantitySold) VALUES (?,?)";
  const [data] = await db.execute(recordQuery, [p_id, quantitySold]);
  const updateStockQuery =
    "UPDATE `products` SET `StockQuantity`=`StockQuantity`-? WHERE ProductID = ?";
  const [result] = await db.execute(updateStockQuery, [quantitySold, p_id]);
  return data;
};

// Create a reporting endpoint to retrieve the total quantity sold for each product using SQL aggregate functions
export const totalQuantitySold = async () => {
  const totalQuantitySold = "SELECT SUM(QuantitySold) FROM sales";
  const [data] = await db.execute(totalQuantitySold, []);
  return data;
};

export const totalProductQuantitySold = async (id) => {
  const totalQuantitySold =
    "SELECT SUM(QuantitySold) FROM sales WHERE ProductID = ?;";

  const [data] = await db.execute(totalQuantitySold, [id]);
  return data;
};
