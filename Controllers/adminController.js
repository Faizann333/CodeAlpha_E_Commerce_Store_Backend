const { Product } = require("../Models/product");
const { User } = require("../Models/user");
const {Order} = require("../Models/order")

exports.postAddProductController = async (req, res) => {
    try {
        const {
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            featured,
            isAvailable,
        } = req.body;

        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            featured,
            isAvailable,
        });
        await newProduct.save();
        res.status(201).json({
            message: "Product added successfully",
            product: newProduct,
            success: true
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error ",
            error: error.message,
            success: false,
        });
    }
};

exports.getAdminProductsController = async (req, res) => {
    try {
        const allProducts = await Product.find().sort({ createdAt: -1 });
        res.status(200).json({ 
            allProducts,
            success : true

        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error ",
            error: error.message,
            success: false,
        });
    }
};

//users

exports.getAdminUsersController = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });
      
        res.status(200).json({
            users,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error ",
            error: error.message,
            success: false,
        });
    }
};

exports.getAdminOrdersController = async (req,res) => {
    try {
        const orders = await Order.find().populate("items.product").sort({createdAt : -1});
        
        res.status(200).json({
            orders,
            success: true,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server  Error ",
            error: error.message,
            success: false,
        });
    }
};

exports.postDeleteProductController = async (req,res) => {
    try {
        const {id} = req.params;
        await Product.findByIdAndDelete(id);
        res.status(200).json({
            message : "Product deleted successfully",
            success : true,
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal Server  Error ", 
            error: error.message,
            success: false,
        });
    }
};
