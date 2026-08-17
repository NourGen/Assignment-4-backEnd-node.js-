import { Router } from "express";
import { successRespons } from "../common/utils/response.utils.js";
import {
  saleRecord,
  totalProductQuantitySold,
  totalQuantitySold,
} from "./sales.service.js";

const router = Router();

router.post("/record", async (req, res, next) => {
  const data = await saleRecord(req.body);
  successRespons({ res, message: "Sold successfully", data });
});

router.get("/checkSales{/:id}", async (req, res, next) => {
  const { id } = req.params;
  if (id) {
    const data = await totalProductQuantitySold(id);
    successRespons({ res, message: "totalQuantitySold", data });
  }
  const data = await totalQuantitySold();
  successRespons({ res, message: "totalQuantitySold", data });
});


export default router;
