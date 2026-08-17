import { Router } from "express";
import { successRespons } from "../../common/utils/response.utils.js";
import { signUp , logIn } from "./suppliers.auth.service.js";
import { db } from "../../../DB/db.js";

const router = Router();

router.post("/signup", async (req, res, next) => {
 const data =  await signUp(req.body);
//  return res.status(200).json({message:'DONE',data})
  return successRespons({ res, status: 200, message: "DONE",data});
});
router.post("/login", async (req, res, next) => {
 const data =  await logIn(req.body);
//  return res.status(200).json({message:'DONE',data})
  return successRespons({ res, status: 200, message: "DONE",data});
});

export default router;
