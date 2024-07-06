import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Import routes
import userRoute from "./route/user.route.js";
import bookrouter from "./route/books.route.js";
import Adminrouter from "./route/admin.route.js";
import studrouter from "./route/stud.route.js";
import slotrouter from "./route/slot.route.js";
import borrowedrouter from "./route/borrowed.route.js";
import notifrouter from "./route/notification.route.js";
import authroute from "./route/auth.route.js";

const app = express();

dotenv.config();

app.use(
  cors({
    origin: ["https://infolib.vercel.app/"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Allow cookies to be sent with requests
  })
);
app.use(express.json());
app.use(bodyParser.json());

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

mongoose
  .connect(URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.log("Error:", error));

app.use("/user", userRoute);
app.use("/book", bookrouter);
app.use("/Admin", Adminrouter);
app.use("/Student", studrouter);
app.use("/slot", slotrouter);
app.use("/borrowed", borrowedrouter);
app.use("/notif", notifrouter);
app.use("/api/auth", authroute);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
