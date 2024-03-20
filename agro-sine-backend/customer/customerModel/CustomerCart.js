import mongoose from "mongoose";

const CustomerCartSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true
        },
        itmesOrdered: [
            {
                vegetableId: {
                    type: String,
                },
                quantity: {
                    type: Number,
                    default: 1,
                },
            },
        ],
    }, { timestamps: true }
);

export default mongoose.model("CustomerCart", CustomerCartSchema);