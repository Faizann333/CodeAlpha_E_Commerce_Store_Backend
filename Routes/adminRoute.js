const express = require('express');
const {postAddProductController,getAdminProductsController} = require('../Controllers/adminController');

const adminRouter = express.Router();

adminRouter.post('/add-product',postAddProductController);
adminRouter.get('/get-all-products',getAdminProductsController);


module.exports = {adminRouter};