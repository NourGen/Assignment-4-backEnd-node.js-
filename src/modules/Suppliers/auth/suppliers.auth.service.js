import { db } from "../../../DB/db.js";

export const signUp = async (inputs) => {
  const { name, phone } = inputs; //req.body
  console.log({ name, phone });

  const findQuery = "SELECT * FROM suppliers WHERE ContactNumber =?";
  const [data] = await db.execute(findQuery, [phone]);
  if (data?.length) throw new Error("Dublicated Phone number");

  const addQuery =
    "INSERT INTO suppliers( SupplierName, ContactNumber) VALUES (?,?)";
  const [] = await db.execute(addQuery, [name, phone]);
  const displaySupplier = "SELECT * FROM suppliers WHERE ContactNumber = ?"
  const [display] = await db.execute(displaySupplier,[phone])
  return display;
};

export const logIn = async (inputs) => {
  const { name, phone } = inputs; //req.body

  const findQuery =
    "SELECT * FROM suppliers WHERE ContactNumber =? and SupplierName = ?";
  const [data] = await db.execute(findQuery, [phone, name]);
  if (!data?.length) throw new Error("Invalid login data");
  return data;
};
