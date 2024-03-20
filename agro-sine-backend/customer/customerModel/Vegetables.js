import mongoose from "mongoose";

const VegetableSchema = new mongoose.Schema(
    {
        farmerId: {
            type: String,
            required: true,
        },
        vegetableName: {
            type: String,
            required: true,
        },
        vegetableDescription: {
            type: String,
            required: true,
        },
        vegetbaleImage: {
            type: String,
            required: true
        },
        vegetbaleCategories: {
            type: Array
        },
        vegetableType: {
            type: String,
            required: true
        },
        vegetbalesize: {
            type: Array
        },
        vegetbaleFarmBy: {
            type: String,
            required: true,
        },
        vegetbaleprice: {
            type: Number,
            required: true
        },
        vegetbaleinStock: {
            type: Boolean,
            default: true
        },
    }, { timestamps: true }
)

export default mongoose.model("VegetableList",VegetableSchema);