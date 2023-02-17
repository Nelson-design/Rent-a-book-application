const { Book } = require("../models/books.model");


const addBookController = async (req, res) => {
    try {
        const { title, price, description,  } = req.body;

        if (!title && price && description)
        return res.status(400).json({
          message: "Title, Price and description is required",
        });
      let book = await Book.create(req.body);
      return res.status(201).json({
        message: "Book created",
        data: book,
      });


	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "internal server issues",
		});
	}
};

const fetchAllBooks = async (req, res) => {
    try {
      let books = await Book.find({});
      return res.status(200).json({
        message: "Books fetched",
        data: books,
      });
    } catch (err) {
      console.log(err);
      return res.status(500).json("server issues");
    }
};



const findByNameController = async (req, res) => {
    
    try {
        const bookExist = await Book.findOne({ title: req.params.title });
        // console.log(req.params);
        if (!bookExist) {
            return res.status(400).json({
                message: "Book requested not found",
            });
        }
        return res.status(200).json({
            message: "Books fetched",
            data: bookExist,
        });


    }
    catch (err) {
        console.log(err);
        return res.status(500).json("server issues");
    }
};

const updateBooksController = async (req, res) => {
    try {
        const bookExist = await Book.findOne({ title: req.body.title });
        // console.log(req.params);
        if (!bookExist) {
            return res.status(400).json({
                message: "Book requested not found",
            });
        }

        const bookUpdate = await bookExist.updateOne(req.body)
        return res.status(200).json({
            message: "Books fetched",
            data: bookUpdate,
        });


    }
    catch (err) {
        console.log(err);
        return res.status(500).json("server issues");
    }
};

const findRandomBookController = async (req, res) => {
	try {
		const foundSearch = await Book.find({ $text: { $search: req.body.search } });
		if (!foundSearch) {
			return res.status(400).json({
				message: "Book requested not found",
			});
		}

		return res.status(200).json({
			message: "Book requested  found",
			data: foundSearch,
		});
	} catch (err) {
		console.log(err);
		return res.status(500).json("server issues");
	}
};

const deleteBookController = async (req, res) => {
    try {
        const documentFound = await Book.findByIdAndDelete(req.params.id);
        console.log(documentFound);
        if (!documentFound) {
            return res.status(400).json({
				message: "Book requested not found",
			});
        }
        return res.status(200).json({
            message: "Book deleted",
          });

	} catch (err) {
		console.log(err);
		return res.status(500).json("server issues");
	}
};
  
module.exports = {
    fetchAllBooks,
    addBookController,
    findByNameController,
    updateBooksController,
    findRandomBookController,
    deleteBookController,

};