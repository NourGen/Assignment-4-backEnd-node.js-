import express from "express";
import { bootstrapDB } from "./src/DB/db.js";
import { globalErroeHandling } from "./src/middleware/error.middleware.js";
import {
  productsController,
  salesController,
  suppliersAuthController,
} from "./src/modules/index.js";
import { suppliersUserController } from "./src/modules/Suppliers/user/index.js";
import { PORT } from "./src/config.js";
import { CreatDBUserController } from "./src/modules/CreateDBUser/index.js";

const app = express();
console.log(process.env.NODE_ENV);
bootstrapDB(app, PORT);

app.use(express.json());

app.use("/suppliers/auth", suppliersAuthController);
app.use("/suppliers/user", suppliersUserController);
app.use("/products", productsController);
app.use("/sales", salesController);
app.use("/DBUser",CreatDBUserController)

app.all("{/*dummy}", (req, res, next) =>
  res.status(404).json({ Message: "Page Not found" }),
);



app.use(globalErroeHandling);
