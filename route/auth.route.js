import express from "express";
import {
  resetPassword,
  sendOTP,
  verifyOTP,
} from "../controller/auth.controller.js";

const passrouter = express.Router();

passrouter.post("/send-otp", sendOTP);
passrouter.post("/verify-otp", verifyOTP);
passrouter.post("/reset-password", resetPassword);

export default passrouter;
