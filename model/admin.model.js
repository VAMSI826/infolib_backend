import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({
  userid: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});
const admin = mongoose.model("admin", AdminSchema);
export default admin;
