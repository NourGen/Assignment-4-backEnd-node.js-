import { Router } from "express";
import { successRespons } from "../common/utils/response.utils.js";
import {
  createProduct,
  getOneProduct,
  productsList,
  updateProduct,
  deleteProduct,
  highestStock,
  productReport,
} from "./products.service.js";

const router = Router();

router.post("/create", async (req, res, next) => {
  const data = await createProduct(req.body);
  return successRespons({ res, message: "Product Created successfully", data });
});
router.get("/stock", async (req, res, next) => {
  const data = await highestStock();
  return successRespons({ res, data });
});
router.get("/list", async (req, res, next) => {
  const data = await productsList();
  return successRespons({ res, data });
});
router.get("/report", async (req, res, next) => {
  const data = await productReport();
  return successRespons({ res, data });
});
router.get("/:id", async (req, res, next) => {
  const data = await getOneProduct(req.params);
  return successRespons({ res, data });
});
router.patch("/:id", async (req, res, next) => {
  const data = await updateProduct(req.body, req.params);
  return successRespons({ res, message: "Product updated successfully", data });
});
router.delete("/:id", async (req, res, next) => {
  const data = await deleteProduct(req.params);
  return successRespons({ res, message: "Product deleted successfully", data });
});




export default router;
