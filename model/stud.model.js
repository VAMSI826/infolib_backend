import mongoose from "mongoose";

const studschema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  uucms: {
    type: String,
    required: true,
  },
  course: {
    type: String,
    required: true,
  },
  semester: {
    type: String,
    required: true,
  },
});

const Stud = mongoose.model("Stud", studschema);

export default Stud;
