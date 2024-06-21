import Stud from "../model/stud.model.js";
import User from "../model/user.model.js";


export const signup = async (req, res) => {
  try {
    const {
      name,
      uucms,
      course,
      semester,
      gender,
      phone,
      email,
      userid,
      password,
    } = req.body;

    const studsignup = await Stud.findOne({ uucms });
    const user = await User.findOne({ uucms });
    if (user) {
      return res.status(400).json({ message: "Student already exists" });
    } else if (studsignup) {
      const createdUser = new User({
        name: name,
        uucms: uucms,
        course: course,
        semester: semester,
        gender: gender,
        phone: phone,
        email: email,
        userid: userid,
        password: password,
        borrowedbookscnt: 0,
      });
      await createdUser.save();
      res.status(201).json({
        message: "User created successfully",
        user: {
          _id: createdUser._id,
          name: createdUser.name,
          uucms: createdUser.uucms,
          course: createdUser.course,
          semester: createdUser.semester,
          gender: createdUser.gender,
          phone: createdUser.phone,
          email: createdUser.email,
          userid: createdUser.userid,
          borrowedbookscnt: createdUser.borrowedbookscnt,
        },
      });
    } else {
      return res.status(400).json({
        message: "You are not eligible to signup.\n Please contact your Admin",
      });
    }
  } catch (error) {
    console.log("error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userid, password } = req.body;
    const user = await User.findOne({ userid });
    if (user) {
      if (password === user.password) {
        res.status(200).json({
          message: "Login Successful",
          user: {
            _id: user._id,
            name: user.name,
            uucms: user.uucms,
            course: user.course,
            semester: user.semester,
            gender: user.gender,
            phone: user.phone,
            email: user.email,
            userid: user.userid,
            borrowedbookscnt: user.borrowedbookscnt,
          },
        });
      } else {
        return res.status(400).json({ message: "Invalid password" });
      }
    } else {
      return res.status(400).json({ message: "Invalid username " });
    }
  } catch (error) {
    console.log("Error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getStud = async (req, res) => {
  try {
    const student = await User.find();
    res.status(200).json(student);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json(error);
  }
};
export const changePassword = async (req, res) => {
  try {
    const { uucms, password, newpassword, confirmpassword } = req.body.data;
    const student = await User.findOne({ uucms });

    if (student.password !== password) {
      return res.status(400).json({ message: "Current password is incorrect" });
    } else if (password === newpassword) {
      return res
        .status(400)
        .json({ message: "Current password is same as new password" });
    } else if (newpassword !== confirmpassword) {
      return res.status(400).json({ message: "The passwords don't match" });
    } else {
      student.password = newpassword;
      await student.save();
      res.status(200).json({ message: "Password changed successfully" });
    }
  } catch (error) {
    console.log("Error:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

// export const forgotPassword = async (req, res) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });

//     if (!user) {
//       return res.status(404).send({ message: "User not found" });
//     }

//     // Generate a unique JWT token for the user that contains the user's id
//     const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
//       expiresIn: "10m",
//     });

//     // Send the token to the user's email
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL,
//         pass: process.env.PASSWORD_APP_EMAIL,
//       },
//     });

//     const mailOptions = {
//       from: process.env.EMAIL,
//       to: req.body.email,
//       subject: "Reset Password",
//       html: `<h1>1234</h1>`,
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//       if (err) {
//         return res.status(500).send({ message: err.message });
//       }
//       res.status(200).send({ message: "Email sent" });
//     });
//   } catch (err) {
//     res.status(500).send({ message: err.message });
//   }
// };
