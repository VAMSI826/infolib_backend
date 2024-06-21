import slot from "../model/slots.model.js";
import Book from "../model/books.model.js";
import User from "../model/user.model.js";
import borrowed from "../model/borrowed.model.js";

export const addSlot = async (req, res) => {
  try {
    const date = new Date();
    const { uucms, barcode } = req.body.data;
    const book = await Book.findOne({ barcode });
    const user = await User.findOne({ uucms });
    const Slot = await slot.findOne({ uucms, barcode });
    const borrow = await borrowed.findOne({ uucms, barcode });

    if (Slot) {
      return res.status(500).json({ message: "Slot already exists" });
    } else if (borrow) {
      return res.status(500).json({ message: "Book already borrowed" });
    } else {
      const newSlot = new slot({
        name: user.name,
        uucms: uucms,
        barcode: barcode,
        title: book.title,
        borroweddate: date.toLocaleDateString(),
        timeofbooking: date.toLocaleTimeString(),
      });
      book.copies = book.copies - 1;
      console.log(book.copies);
      await book.save();
      await newSlot.save();
      res
        .status(201)
        .json({ message: "Slot added successfully", slot: newSlot });
    }
  } catch (error) {
    console.error("Error adding slot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getSlots = async (req, res) => {
  try {
    const slots = await slot.find();
    res.status(200).json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteExpiredSlots = async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const deldate = twentyFourHoursAgo.toLocaleDateString();
    const del = await slot.find({ borroweddate: deldate });
    console.log(del);
    del.map(async (v, i) => {
      const barcode = v.barcode;
      const books = await Book.find({ barcode });
      if (books.length > 0) {
        books.forEach(async (book) => {
          book.copies = book.copies + 1;
          console.log(book.copies);
          await book.save();
          console.log(book);
        });
      }
    });
    await slot.deleteMany({ borroweddate: deldate });
    res.status(201).json({ message: "Slot deleted successfully" });
  } catch (error) {
    console.error("Error deleting expired slots:", error);
  }
};
