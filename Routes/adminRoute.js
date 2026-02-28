const express = require("express");
const {
    postAddProductController,
    getAdminProductsController,
    getAdminUsersController,
    getAdminOrdersController,
    postDeleteProductController
} = require("../Controllers/adminController");

const adminRouter = express.Router();

adminRouter.post("/add-product", postAddProductController);
adminRouter.get("/get-all-products", getAdminProductsController);
adminRouter.get("/get-users", getAdminUsersController);
adminRouter.get("/get-orders", getAdminOrdersController);
adminRouter.post("/delete-product/:id",postDeleteProductController);


module.exports = { adminRouter };
