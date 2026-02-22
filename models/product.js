const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type :String,
        required : true
    },
    description: {
        type :String,
        required : true
    },
    price: {
        type :Number,
        required : true
    },
   
    category: {
        type :String,
        required : true
    },
    imageUrl: {
        type :String,
        required : true
    },
    stock: {
        type :Number,
        required : true
    },
    featured : {
        type :Boolean,
        default : false
    },
     isAvailable: {
        type :Boolean,
        default : true
    }
},{timestamps : true}
)

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

module.exports = {Product};