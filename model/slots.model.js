import mongoose from "mongoose";

const slotsschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uucms: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  borroweddate: {
    type: String,
    required: true,
  },
  timeofbooking: {
    type: String,
    required: true,
  },
});

const slot = mongoose.model("slot", slotsschema);
export default slot;
