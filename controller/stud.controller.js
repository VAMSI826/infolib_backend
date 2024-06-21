import Stud from "../model/stud.model.js";


export const register = async (req, res) => {
  try {
    const { name, uucms, course, semester } = req.body;
    const student = await Stud.findOne({ uucms });
    if (student) {
      return res.status(400).json({ message: "Student Already Exists" });
    } else {
      const createStudent = new Stud({
        name: name,
        uucms: uucms,
        course: course,
        semester: semester,
      });
      await createStudent.save();
      res.status(201).json({ message: "Student registered successfully" });
      console.log(createStudent);
    }
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
