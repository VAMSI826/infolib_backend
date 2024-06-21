import express from "express";
import { getnotif } from "../controller/notification.controller.js";

const notifrouter = express.Router();

notifrouter.get("/getnotif", getnotif);

export default notifrouter;
