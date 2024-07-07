import borrowed from "../model/borrowed.model.js";
import slot from "../model/slots.model.js";
import User from "../model/user.model.js";
import Book from "../model/books.model.js";

export const borrowedbook = async (req, res) => {
  try {
    const date = new Date();
    const returnDate = new Date(date);
    returnDate.setDate(date.getDate() + 14);

    const { uucms, barcode } = req.body.data;
    console.log(req.body.data);

    const Slot = await slot.findOne({ uucms, barcode });
    const user = await User.findOne({ uucms });
    console.log(Slot);

    const borrowedbook = await borrowed.findOne({ uucms, barcode });
    console.log(borrowedbook);
    if (borrowedbook) {
      return res.status(500).json({ message: "Book already issued" });
    } else {
      const newborrowedbooks = new borrowed({
        name: Slot.name,
        uucms: Slot.uucms,
        barcode: barcode,
        title: Slot.title,
        borroweddate: date.toLocaleDateString("en-GB"),
        returndate: returnDate.toLocaleDateString("en-GB"),
        fine: 0,
      });

      await newborrowedbooks.save();
      res.status(201).json({
        message:
          "Book issued successfully.\n Please refresh to view the changes.",
        borrowedbook: newborrowedbooks,
      });

      await Slot.deleteOne({ _id: Slot._id });
      user.borrowedbookscnt++;
      console.log(user.borrowedbookscnt);
      await user.save();
    }
  } catch (error) {
    console.error("Error adding book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getBorrowed = async (req, res) => {
  try {
    const borrowbooks = await borrowed.find();

    const booksWithFine = [];

    for (const book of borrowbooks) {
      const currentDate = new Date();
      const returnDate = book.returndate;
      const [day, month, year] = returnDate.split("/");
      const dueDate = new Date(`${year}-${month}-${day}`);
      const fine = calculateFine(currentDate, dueDate);

      const bookWithFine = {
        _id: book._id,
        name: book.name,
        uucms: book.uucms,
        barcode: book.barcode,
        title: book.title,
        borroweddate: book.borroweddate,
        returndate: dueDate.toLocaleDateString("en-GB"),
        fine: fine,
      };

      booksWithFine.push(bookWithFine);
      await borrowed.findByIdAndUpdate(book._id, { fine: fine });
    }

    function calculateFine(currentDate, dueDate) {
      const diffTime = currentDate.getTime() - dueDate.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) - 1;
      return diffDays > 0 ? diffDays * 5 : 0;
    }

    // Return the array of borrowed books with fine information
    res.status(200).json(booksWithFine);
  } catch (error) {
    console.error("Error fetching borrowed books:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const delBook = async (req, res) => {
  try {
    const { uucms, title } = req.body;
    console.log(req.body);
    const borrow = await borrowed.findOne({ uucms, title });
    const user = await User.findOne({ uucms });
    const book = await Book.findOne({ title });
    if (!borrow) {
      return res.status(404).json({ message: "Book not found" });
    }
    user.borrowedbookscnt--;
    await user.save();
    book.copies++;
    console.log(book.copies);
    await book.save();
    await borrowed.deleteOne({ _id: borrow._id });
    res.status(200).json({
      message: "Book deleted successfully.\n Please refresh to see the changes",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const renewBook = async (req, res) => {
  try {
    const date = new Date();
    const { uucms, title } = req.body;
    console.log(req.body);
    const borrow = await borrowed.findOne({ uucms, title });
    if (!borrow) {
      return res.status(404).json({ message: "Book not found" });
    }
    borrow.borroweddate = date.toLocaleDateString("en-GB");
    const returnDate = new Date(date);
    returnDate.setDate(date.getDate() + 14);
    borrow.returndate = returnDate.toLocaleDateString("en-GB");
    borrow.fine = 0;
    await borrow.save();
    res.status(200).json({
      message: "Book renewed successfully.\n Please refresh to see the changes",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
