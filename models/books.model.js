const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        title: String,
        price: String,
        author: String,
        bookdescription: String,
        ofDate: Date,
    },
    {
        timestamps: true,
    }
);

const Book = mongoose.model("Book", bookSchema);
module.exports = Book;