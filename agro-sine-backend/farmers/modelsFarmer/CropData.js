import mongoose from "mongoose";

const CropDataSchema = new mongoose.Schema(
    {
        memberId: {
            type: String,
            required: true
        },
        diseaseName: {
            type: String,
            required: true

        },
        diseaseEffected: {
            type: String,
            required: true
        },
        diseaseType: {
            type: String,
            required: true
        },
        CropHaveDisease: {
            type: String,
            required: true
        },
        symptomForThatDisease: {
            type: String,
            required: true
        },
        organicTreatment: {
            type: String,
            required: true
        },
        chemicalTreatment: {
            type: String,
            required: true
        },
        Caused: {
            type: String,
            required: true
        },
        Measures: {
            type: String,
            required: true
        },
        imageURL: {
            type: String,
            required: true
        },
        imageURL2: {
            type: String,
            required: true
        },
        imageURL3: {
            type: String,
            required: true
        },

    }
)

export default mongoose.model("CropData", CropDataSchema);