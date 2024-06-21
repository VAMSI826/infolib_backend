import express from "express";
import {
  addbook,
  bookslot,
  delBook,
  getBook,
} from "../controller/books.controller.js";

const bookrouter = express.Router();

bookrouter.get("/bookdetails", getBook);
bookrouter.delete("/delbook", delBook);
bookrouter.post("/addbook", addbook);
bookrouter.post("/slotbook", bookslot);

export default bookrouter;
