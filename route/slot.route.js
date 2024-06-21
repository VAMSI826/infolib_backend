import express from "express";
import {
  addSlot,
  deleteExpiredSlots,
  getSlots,
} from "../controller/slots.controller.js";

const slotrouter = express.Router();

slotrouter.post("/addslot", addSlot);
slotrouter.get("/slots", getSlots);
slotrouter.delete("/deleteoldslots", deleteExpiredSlots);

export default slotrouter;
