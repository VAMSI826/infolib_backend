import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import userRoute from "./route/user.route.js";
import bookrouter from "./route/books.route.js";
import Adminrouter from "./route/admin.route.js";
import studrouter from "./route/stud.route.js";
import slotrouter from "./route/slot.route.js";
import borrowedrouter from "./route/borrowed.route.js";
import notifrouter from "./route/notification.route.js";
import authroute from "./route/auth.route.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Define __dirname in ES module scope
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  cors()
  //{
  //   origin: ["https://infolib.vercel.app/"],
  //   methods: ["GET", "POST", "DELETE"],
  //   credentials: true,
  // }
);
app.use(express.json());
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI);
  console.log("Connected to MongoDB");
} catch (error) {
  console.log("Error:", error);
}

app.use("/user", userRoute);
app.use("/book", bookrouter);
app.use("/Admin", Adminrouter);
app.use("/Student", studrouter);
app.use("/slot", slotrouter);
app.use("/borrowed", borrowedrouter);
app.use("/notif", notifrouter);
app.use("/api/auth", authroute);

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

app.get("/", (req, res) => {
  res.send("Hello World!");
});
app.listen(PORT, () => {
  console.log(` sever is listening on port ${PORT}`);
});
