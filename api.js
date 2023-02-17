const express = require("express");
const api = express();
const path = require("path");
const { indexController,
    authController,
} = require("./controllers");
const { appendFile } = require("fs");
const { changePasswordController } = require("./controllers/auth.controller");
const { verifyToken, checkIfAdmin } = require("./controllers/middlewares");
const { validateSignupMiddleware,
    validateLoginMiddleware,
    validatePasswordChangeMiddleware,
} = require("./models/validators/auth.validator");
const { fetchAllBooks, addBookController, findByNameController, updateBooksController, findRandomBookController, deleteBookController } = require("./controllers/book.controller");
const { seedSuperAdmin } = require("./controllers/seed");
const { validatecreateBooksChangeSchema, validateupdateBooksChangeSchema, validateGeneralSearchSchema } = require("./models/validators/books.validation");
const { getGoogleLogin, handleGoogleLogin } = require("./controllers/google.auth");
const dotenv = require("dotenv");
dotenv.config();
const { AppStarter } = require("./utils");
const userAdminUpdate = require("./controllers/user.controller");
const { cartController } = require("./controllers/cart.controller");
const port = process.env.PORT;

api.use(express.json());
api.use(express.urlencoded({
    extended: true,
})
);

api.get("/", indexController);
api.get("/books", fetchAllBooks);
api.get("/books/:title", verifyToken, findByNameController);

// Email Authentication


api.post("/signup", validateSignupMiddleware, authController.SignupController);
api.post("/login", validateLoginMiddleware, authController.LoginController);
api.post("/books", validatecreateBooksChangeSchema, checkIfAdmin, addBookController);
api.post("/search", verifyToken, validateGeneralSearchSchema, findRandomBookController);

api.put("/books", checkIfAdmin,seedSuperAdmin, validateupdateBooksChangeSchema, updateBooksController);
api.put("/password", validatePasswordChangeMiddleware, verifyToken, changePasswordController);

api.delete("/books/:id", checkIfAdmin, deleteBookController);
api.post("/cart/:id", verifyToken, cartController);

// Google Authentication

// Redirect the user to the Google signin page
api.get("/auth/google", getGoogleLogin);

api.get("/updateUser", checkIfAdmin, userAdminUpdate);

// Retrieve user data using the access token received
api.get("/auth/google/callback", handleGoogleLogin);

// profile route after successful sign in
api.get("/profile", (req, res) => {
  console.log(req);
  res.send("Welcome");
});


// api.get("/books", fetchAllBooks);
// api.post("/books",validatecreateBooksChangeSchema ,checkIfAdmin, addBookController);
// api.get("/books/:title", verifyToken, findByNameController);
// api.put("/updateUser", checkIfAdmin, userAdminUpdate);
// api.put("/books", checkIfAdmin, validateupdateBooksChangeSchema,updateBooksController);

api.listen(port, AppStarter(port));