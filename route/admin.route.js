import express from "express";
import { adminlogin } from "../controller/admin.controller.js";
const router = express.Router();

router.post("/Adminlogin", adminlogin);

export default router;
