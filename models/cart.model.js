const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        books: [
            {
             bookId: Number,
             name: String,
             discription: String,
             author: String,
            price: Number,
            },
            ],
             active: {
            type: Boolean,
            default: true
             },
             modifiedOn: {
              type: Date,
             default: Date.now
            }
             },
            {
            timestamps: true
            }
);
        
const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
