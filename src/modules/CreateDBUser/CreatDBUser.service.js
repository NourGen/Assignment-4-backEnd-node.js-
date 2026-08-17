import { db } from "../../DB/db.js";

export const createUser = async (DB_User) => {
  const [createData] = await db.execute(
    `CREATE USER ${DB_User}@localhost IDENTIFIED VIA mysql_native_password USING '';`,
  );
  const [grantData] = await db.execute(
    `GRANT SELECT, INSERT, UPDATE ON store.* TO ${DB_User}@localhost;`,
  );
  console.log({ createData: createData, grantData: grantData });
};

export const revokeUpdate = async (DB_User) => {
  const [revokeData] = await db.execute(
    `REVOKE UPDATE ON store.* FROM ${DB_User}@localhost;`,
  );
  console.log({ revokeData });
};

export const grantDelete = async (DB_User) => {
  const [grantData] = await db.execute(
    `GRANT DELETE ON store.sales TO ${DB_User}@localhost;`,
  );
  console.log({ grantData });
};
