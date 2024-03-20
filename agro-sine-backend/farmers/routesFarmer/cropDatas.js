import express from 'express';
import { verifyingTokens } from '../../verifyingTokens.js';
import CropData from '../modelsFarmer/CropData.js';
import {createOwnError} from '../../errorCreatetor.js';

// Create an Express Router instance
const router = express.Router();

// Route for adding new crop disease details (Requires authentication)
router.post("/", verifyingTokens, async (req, res, next) => {
    // Create a new CropData instance with the user's ID and request body data
    const newCropDiseaseData = new CropData({ userId: req.user.id, ...req.body });
    try {
        // Save the new crop disease details to the database
        const saveCropDiseaseDetails = await newCropDiseaseData.save();
        res.status(200).json(saveCropDiseaseDetails);
    } catch (err) {
        next(err);
    }
});

// Route for updating crop disease details by ID (Requires authentication)
router.put("/:id", verifyingTokens, async (req, res, next) => {
    try {
        // Find the crop disease data by ID
        const CropDiseaseData = await CropData.findById(req.params.id);
        if (!CropDiseaseData) return next(createOwnError(404, "Crop Disease Data is not found"));

        // Check if the authenticated user is the owner of the data
        if (req.user.id === CropDiseaseData.memberId) {
            // Update the crop disease details and return the updated data
            const updateCropDiseaseDetails = await CropData.findByIdAndUpdate(
                req.params.id,
                {
                    $set: req.body,
                },
                {
                    new: true
                }
            );
            res.status(200).json(updateCropDiseaseDetails);
        } else {
            return next(createOwnError(403, "You are not an authorized user to update the disease details!!!"));
        }
    } catch (err) {
        next(err);
    }
});

// Route for deleting crop disease details by ID (Requires authentication)
router.delete("/:id", verifyingTokens, async (req, res, next) => {
    try {
        // Find the crop data by ID
        const cropData = await CropData.findById(req.params.id);
        if (!cropData) return next(createOwnError(404, "Crop Details are not found in the database!"));

        // Check if the authenticated user is the owner of the data
        if (req.user.id === cropData.memberId) {
            // Delete the crop disease details
            await CropData.findByIdAndDelete(req.params.id);
            res.status(200).json("Crop Details have been deleted...!!!");
        } else {
            return next(createOwnError(403, "Sorry, you can't delete other data. Please sign in to delete data!"));
        }
    } catch (err) {
        next(err);
    }
});

// Route for finding crop details by ID
router.get("/find/:id", async (req, res, next) => {
    try {
        // Find crop details by ID and send the response
        const cropData = await CropData.findById(req.params.id);
        res.status(200).json(cropData);
    } catch (err) {
        next(err);
    }
});
// Route to fetch a random sample of crop data
router.get("/normaldata", async (req, res, next) => {
    try {
        // Use the aggregate method to retrieve a random sample of 20 crop data entries
        const cropData = await CropData.aggregate([{ $sample: { size: 20 } }]);
        // Respond with a successful status code and the fetched crop data
        res.status(200).json(cropData);
    } catch (err) {
        // Handle errors and pass them to the error-handling middleware
        next(err);
    }
});

// Route to search for crop data based on a query
router.get("/search", async (req, res, next) => {
    // Extract the search query from the request's query parameters
    const query = req.query.q;
    try {
        // Use the find method to search for crop data with disease names matching the query (case-insensitive)
        // Limit the results to the first 20 entries
        const cropData = await CropData.find({ diseaseName: { $regex: query, $options: "i" } }).limit(20);
       
        // Respond with a successful status code and the matching crop data
        res.status(200).json(cropData);
    } catch (err) {
        // Handle errors and pass them to the error-handling middleware
        next(err);
    }
});


export default router;