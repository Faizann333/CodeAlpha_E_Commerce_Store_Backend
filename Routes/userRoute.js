const express = require('express');
const { getFeaturedProductsController ,
     getAllAvailableProductsController,
    getProductByIdController
} = require('../Controllers/userController');


const userRouter = express.Router();

userRouter.get('/get-featured-products',getFeaturedProductsController);
userRouter.get('/get-all-available-products',getAllAvailableProductsController);
userRouter.get('/get-product-by-id/:id',getProductByIdController);



module.exports = {userRouter};