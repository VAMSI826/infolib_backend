import express from "express";
import {
  signup,
  login,
  getStud,
  changePassword,
} from "../controller/user.controller.js";
const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/getStud", getStud);
router.post("/updatepass", changePassword);

export default router;
