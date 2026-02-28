const { Product } = require("../Models/product");
const { Cart } = require("../Models/cart");
const { Order } = require("../Models/order");

exports.getFeaturedProductsController = async (req, res) => {
    try {
        const featuredProducts = await Product.find({
            featured: true,
            isAvailable: true,
        }).sort({ createdAt: -1 });
        res.status(200).json({ featuredProducts });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error ",
            error: error.message,
        });
    }
};

exports.getAllAvailableProductsController = async (req, res) => {
    try {
        const allAvailableProducts = await Product.find({
            isAvailable: true,
        }).sort({ createdAt: -1 });
        res.status(200).json({ allAvailableProducts });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error ",
            error: error.message,
        });
    }
};

exports.getProductByIdController = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error ",
            error: error.message,
        });
    }
};

//cart controllers

exports.postAddToCartController = async (req, res) => {
    const userId = req.user.userId;
    console.log(req.user);
    const { productId } = req.body;

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
        cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
        (item) => item.product.toString() === productId,
    );

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.items.push({ product: productId, quantity: 1 });
    }

    await cart.save();

    res.status(200).json({ success: true, cart });
};

exports.getCartController = async (req, res) => {
    try {
        console.log(req.user.userId);
        const cart = await Cart.findOne({ user: req.user.userId }).populate(
            "items.product",
        );
        console.log(cart);
        if (!cart) {
            console.log("cart not found");
            return res.status(404).json({ message: "Cart not found" });
        }
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

//Order

exports.postOrderController = async (req, res) => {
    const { shippingAddress } = req.body;

    const cart = await Cart.findOne({ user: req.user.userId }).populate(
        "items.product",
    );

    if (!cart || cart.items.length === 0) {
        return res.status(400).json({ message: "Cart is empty" });
    }

    let totalAmount = 0;

    const orderItems = cart.items.map((item) => {
        totalAmount += item.product.price * item.quantity;

        return {
            product: item.product._id,
            quantity: item.quantity,
            price: item.product.price,
        };
    });

    const order = new Order({
        user: req.user.userId,
        items: orderItems,
        totalAmount,
        shippingAddress,
    });

    await order.save();

    // Clear cart after order
    cart.items = [];
    await cart.save();

    res.json({ message: "Order placed successfully", order });
};
