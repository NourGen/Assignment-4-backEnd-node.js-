import { Router } from "express";
import { successRespons } from "../../common/utils/response.utils.js";
import {
  updateUser,
  deleteUser,
  getUser,
  supplierList,
  searchName,
} from "./suppliers.user.service.js";

const router = Router();

router.get("/list", async (req, res, next) => {
  const data = await supplierList();
  successRespons({ res, message: "Suppliers/list", data });
});
router.get("/search{/:name}", async (req, res, next) => {
  const data = await searchName(req.params);
  successRespons({ res, data });
});

router.get("/:id", async (req, res, next) => {
  const data = await getUser(req.params);
  successRespons({ res, message: "Suppliers/list", data });
});

router.delete("/:id", async (req, res, next) => {
  const data = await deleteUser(req.params);
  successRespons({ res, message: "The user deleted successfully", data });
});

router.patch("/:id", async (req, res, next) => {
  const data = await updateUser(req.body, req.params);
  successRespons({ res, message: "The user updated successfully", data });
});

export default router;
