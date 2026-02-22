const {Product} = require('../Models/product');

exports.postAddProductController = async (req , res)=>{
    try {
        const {name, description, price, category, imageUrl, stock, featured, isAvailable} = req.body;
        const newProduct = new Product({
            name,
            description,
            price,
            category,
            imageUrl,
            stock,
            featured,
            isAvailable
        });
        await newProduct.save();
        res.status(201).json(
            {message : "Product added successfully", product: newProduct});
    }
    catch (error) {
        res.status(500).json({message : "Internal Server Error"});
    }
}

exports.getAdminProductsController = async (req , res)=>{
    try {
        const allProducts = (await Product.find().sort({createdAt: -1}));
        res.status(200).json({allProducts});

    } catch (error) {
        res.status(500).json(
            {message: 'Internal Server Error ', error: error.message}
        )
    }
}