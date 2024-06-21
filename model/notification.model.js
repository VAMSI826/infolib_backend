import mongoose from "mongoose";

const notifschema = mongoose.Schema({
  category: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const Notif = mongoose.model("Notif", notifschema);
export default Notif;
