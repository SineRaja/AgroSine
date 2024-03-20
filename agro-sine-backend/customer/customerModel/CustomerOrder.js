import mongoose from "mongoose";

const CustomerOrderSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        orderItems: [
            {
                vegetableId:{
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
        orderAmount : {
            type: String,
            required: true,
        },
        customerAddress: {
            type: Object,
            required: true 
        },
        paymentStatus: {
            type: String,
            default: "pending.."
        }
    }, { timestamps: true }
);

export default mongoose.model("CustomerOrders", CustomerOrderSchema);