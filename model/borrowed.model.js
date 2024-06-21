import mongoose from "mongoose";

const borrowedschema = mongoose.Schema({
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
  returndate: {
    type: String,
    required: true,
  },
  fine: {
    type: Number,
  },
});

const borrowed = mongoose.model("borrowed", borrowedschema);
export default borrowed;
