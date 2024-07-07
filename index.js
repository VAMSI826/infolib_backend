import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import userRoute from "./route/user.route.js";
import bookrouter from "./route/books.route.js";
import Adminrouter from "./route/admin.route.js";
import studrouter from "./route/stud.route.js";
import slotrouter from "./route/slot.route.js";
import borrowedrouter from "./route/borrowed.route.js";
import notifrouter from "./route/notification.route.js";
import authroute from "./route/auth.route.js";

const app = express();

const allowedOrigins = ["https://infolib-frontend-d2jy.vercel.app/"];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);
app.use(express.json());
app.use(bodyParser.json());

dotenv.config();

const PORT = process.env.PORT || 4000;
const URI = process.env.MongoDBURI;

try {
  mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
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

app.listen(PORT, () => {
  console.log(` sever is listening on port ${PORT}`);
});
