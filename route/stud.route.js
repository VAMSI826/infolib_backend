import express from "express";
import { register } from "../controller/stud.controller.js";

const studrouter = express.Router()

studrouter.post("/register",register)

export default studrouter;