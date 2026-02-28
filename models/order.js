const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required : true
        },
        items: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                quantity: Number,
                price: Number,
            },
        ],
        totalAmount: Number,
        shippingAddress: {
            fullName: {
                type: String,
                required: true,
            },
            phone: {
                type: String,
                required: true,
            },
            address: {
                type: String,
                required: true,
            },
            city: {
                type: String,
                required: true,
            },
            postalCode: {
                type: String,
            },
        },
        paymentStatus: {
            type: String,
            default: "Pending",
        },
        orderStatus: {
            type: String,
            default: "Processing",
        },
    },
    { timestamps: true },
);

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

module.exports = { Order };
