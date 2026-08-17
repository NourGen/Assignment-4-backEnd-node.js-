import { Router } from "express";
import { successRespons } from "../common/utils/response.utils.js";
import { createUser, grantDelete, revokeUpdate } from "./CreatDBUser.service.js";

const router = Router();

router.post("/create", async (req, res, next) => {
  const [data] = await createUser(req.body.DB_User);
  successRespons({ res, message: "API", data });
});

router.delete("/revoke", async (req, res, next) => {
  const [data] = await revokeUpdate(req.body.DB_User);
  successRespons({ res, message: "API", data });
});

router.patch("/grant", async (req, res, next) => {
  const [data] = await grantDelete(req.body.DB_User);
  successRespons({ res, message: "API", data });
});

export default router;
