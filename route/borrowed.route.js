import express from "express";
import {
  borrowedbook,
  delBook,
  getBorrowed,
  renewBook,
} from "../controller/borrowed.controller.js";

const borrowedrouter = express.Router();

borrowedrouter.post("/borrowedbook", borrowedbook);
borrowedrouter.get("/getBorrow", getBorrowed);
borrowedrouter.delete("/delbook", delBook);
borrowedrouter.delete("/renewbook", renewBook);

export default borrowedrouter;
