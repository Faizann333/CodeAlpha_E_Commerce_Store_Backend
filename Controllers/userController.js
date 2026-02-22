const {Product} = require('../Models/product');

exports.getFeaturedProductsController = async (req , res)=>{    
    try {
        const featuredProducts = await Product.find({featured: true, isAvailable: true}).sort({createdAt: -1});
        res.status(200).json({featuredProducts});
    } catch (error) {
        res.status(500).json(
            {message: 'Internal Server Error ', error: error.message}
        )
    }
}

exports.getAllAvailableProductsController = async (req , res)=>{    
    try {
        const allAvailableProducts = await Product.find({isAvailable: true}).sort({createdAt: -1});
        res.status(200).json({allAvailableProducts});
    } catch (error) {
        res.status(500).json(
            {message: 'Internal Server Error ', error: error.message}
        )
    }
}

exports.getProductByIdController = async (req , res)=>{
    try {
        const id = req.params.id;
        const product = await Product.findById(id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        res.status(200).json({product});
        
        
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error ', error: error.message
        })
    }
}