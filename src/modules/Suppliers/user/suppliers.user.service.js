import { db } from "../../../DB/db.js";

export const supplierList = async () => {
  const listQuery = "SELECT * FROM suppliers";
  const [data] = await db.execute(listQuery, []);
  //   console.log({ data });

  return data;
};

export const getUser = async (params) => {
  const { id } = params;
  const getUserQuery = "SELECT * FROM suppliers WHERE SupplierID = ? ";
  const [data] = await db.execute(getUserQuery, [id]);
  //   console.log({ data });
  if (!data?.length) {
    throw new Error("user not found", { cause: 404 });
  }
  return data;
};

export const deleteUser = async (params) => {
  const { id } = params;
  const getUserQuery = "SELECT * FROM suppliers WHERE SupplierID = ? ";
  const [match] = await db.execute(getUserQuery, [id]);
  if (!match?.length) {
    throw new Error("user not found", { cause: 404 });
  }

  const deleteUserQuery = "DELETE FROM suppliers WHERE SupplierID = ? ";
  const [data] = await db.execute(deleteUserQuery, [id]);

  return data;
};

export const updateUser = async (inputs, params) => {
  const { id } = params;
  const { name, phone } = inputs;
  const getUserQuery = "SELECT * FROM suppliers WHERE SupplierID = ? ";
  const [match] = await db.execute(getUserQuery, [id]);
  if (!match?.length) {
    throw new Error("user not found", { cause: 404 });
  }
  console.log({ name, phone, id });

  const updateUserQuery =
    "UPDATE suppliers SET SupplierName=?,ContactNumber=? WHERE SupplierID = ?  ";
  const [data] = await db.execute(updateUserQuery, [name, phone, id]);

  return data;
};

// Create a reporting endpoint to retrieve suppliers whose names start with 'F'. (0.5 Grade)
export const searchName = async (params) => {
  const { name } = params;
  console.log(name);
  const searchPattern = `${name}%`
  const searchQuery = "SELECT * FROM suppliers where SupplierName LIKE ?"
  const [data] = await db.execute(searchQuery,[searchPattern])
  return data;
};
