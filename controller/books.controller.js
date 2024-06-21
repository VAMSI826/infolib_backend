import Book from "../model/books.model.js";
import Notif from "../model/notification.model.js";

export const getBook = async (req, res) => {
  try {
    const book = await Book.find();
    res.status(200).json(book);
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json(error);
  }
};
export const delBook = async (req, res) => {
  try {
    const { barcode } = req.body;
    const book = await Book.findOne({ barcode });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await Book.deleteOne({ _id: book._id });
    res.status(200).json({
      message: "Book deleted successfully.\n Please refresh to see the changes",
    });
  } catch (error) {
    console.log("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const addbook = async (req, res) => {
  try {
    const {
      title,
      barcode,
      author,
      publication,
      imagelink,
      copies,
      edition,
      category,
    } = req.body;

    const book = await Book.findOne({ barcode });
    console.log(book);
    if (book) {
      return res.status(400).json({ message: "Book already exists" });
    } else {
      const createdBook = new Book({
        title,
        barcode,
        author,
        publication,
        imagelink,
        copies,
        edition,
        category,
      });
      await createdBook.save();
      const date = new Date();
      const des = `Book named ${createdBook.title} under the ${createdBook.category} category has been added. To view the book visit "Books" section `;

      const createdNotif = new Notif({
        category,
        date: date.toLocaleDateString(),
        description: des,
      });
      await createdNotif.save();

      res.status(201).json({
        message: "Book and notification added successfully",
        book: {
          _id: createdBook._id,
          title: createdBook.title,
          barcode: createdBook.barcode,
          author: createdBook.author,
          publication: createdBook.publication,
          imagelink: createdBook.imagelink,
          copies: createdBook.copies,
          edition: createdBook.edition,
          category: createdBook.category,
          date: createdNotif.date,
          description: createdNotif.description,
        },
      });
    }
  } catch (error) {
    console.log("error:" + error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};
export const bookslot = async (req, res) => {
  try {
    const { barcode } = req.body;
    const slot = await Book.findOne({ barcode });
    if (!slot) {
      return res.status(404).json({ error: "Slot not found" });
    }
    // Assuming `slots` is an array field in your Book schema
    slot.slots.push(barcode);
    await slot.save();

    res.status(200).json({ message: "Slot booked successfully", slot });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
