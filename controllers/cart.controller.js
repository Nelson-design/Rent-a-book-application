const { Cart } = require("../models/cart.model");

const cartController = async (req, res) => {
	try {
		const userId = req.params.id; //
		const { productId, quantity, name, price } = req.body;


		let cart = await Cart.findOne({ userId });

		if (cart) {
			//cart exists for user
			let itemIndex = cart.products.findIndex((p) => p.productId == productId);

			if (itemIndex > -1) {
				//product exists in the cart, update the quantity
				let productItem = cart.products[itemIndex];
				productItem.quantity = quantity;
				cart.products[itemIndex] = productItem;
			} else {
				//product does not exists in cart, add new item
				cart.products.push({ productId, quantity, name, price });
			}
			cart = await cart.save();
			return res.status(201).send(cart);
		} else {
			//no cart for user, create new cart
			const newCart = await Cart.create({
				userId,
				products: [{ productId, quantity, name, price }],
			});

			return res.status(201).send(newCart);
		}
	} catch (err) {
		console.log(err);
		return res.status(500).json({
			message: "internal server issues",
		});
	}
};

module.exports = { cartController };