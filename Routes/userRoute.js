const express = require('express');
const {authMiddleware} = require('../Middlewares/authMiddleware')
const { getFeaturedProductsController ,
     getAllAvailableProductsController,
    getProductByIdController,
    postAddToCartController,
    getCartController,
    postOrderController
} = require('../Controllers/userController');


const userRouter = express.Router();

userRouter.get('/get-featured-products',getFeaturedProductsController);
userRouter.get('/get-all-available-products',getAllAvailableProductsController);
userRouter.get('/get-product-by-id/:id',getProductByIdController);

//cart

userRouter.post('/add-to-cart' ,authMiddleware,postAddToCartController)
userRouter.get('/get-cart' ,authMiddleware,getCartController)
userRouter.post('/place-order' , authMiddleware , postOrderController)




module.exports = {userRouter};