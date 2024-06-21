import mongoose from "mongoose";

const bookschema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  barcode: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  publication: {
    type: String,
    required: true,
  },
  imagelink: {
    type: String,
    required: true,
  },
  copies: {
    type: Number,
    required: true,
  },
  edition: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

const Book = mongoose.model("Book", bookschema);
export default Book;
