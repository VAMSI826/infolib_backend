import admin from "../model/admin.model.js";
import bcryptjs from "bcryptjs";

export const adminlogin = async (req, res) => {
  try {
    const { userid, password } = req.body;
    const admindata = await admin.findOne({ userid });
    console.log(req.body);
    console.log(admindata);
    if (admindata) {
      if (password === admindata.password) {
        res.status(200).json({
          message: "Login Successful",
          user: {
            _id: admindata._id,
            userid: admindata.userid,
          },
        });
      } else {
        res.status(400).json({ message: "Invalid password" });
      }
    } else {
      res.status(400).json({ message: "Invalid username" });
    }
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
