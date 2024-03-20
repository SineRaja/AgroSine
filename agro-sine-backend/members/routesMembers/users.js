// Import necessary modules and models
import express from "express";
import { verifyingTokens } from "../../verifyingTokens.js";
import {createOwnError} from '../../errorCreatetor.js';
import Member from '../modelsMembers/User.js';

// Create an Express Router instance
const router = express.Router();

// Handle PUT request to update user details
router.put("/:id", verifyingTokens, async (req, res, next) => {
    // Check if the requested user ID matches the authenticated user's ID
    if (req.params.id === req.user.id) {
        try {
            // Update the user details in the database
            const updateMemberDetails = await Member.findByIdAndUpdate(req.params.id, {
                $set: req.body
            },
                { new: true }
            );
            // Respond with the updated user details
            res.status(200).json(updateMemberDetails);
        } catch (err) {
            // Handle any errors that occur during the update
            next(err);
        }
    } else {
        // Return an error if the user is not authorized to update details
        return next(createOwnError(403, "Sorry, You are not Authorized to update Details! Please sign in."));
    }
});

// Handle DELETE request to delete user details
router.delete("/:id", verifyingTokens, async (req, res, next) => {
    // Check if the requested user ID matches the authenticated user's ID
    if (req.params.id === req.user.id) {
        try {
            // Delete the user from the database
            const deleteUser = await Member.findByIdAndDelete(req.params.id);
            // Respond with a success message
            res.status(200).json("Successfully, User has been deleted from Database!");
        } catch (err) {
            // Handle any errors that occur during deletion
            next(err);
        }
    } else {
        // Return an error if the user is not authorized to delete the account
        return next(createOwnError(403, "Sorry, You are not authorized to delete the account! Please sign in."));
    }
});

// Handle GET request to retrieve user details by ID
router.get("/find/:id", async (req, res, next) => {
    try {
        // Find and retrieve user details by ID
        const member = await Member.findById(req.params.id);
        // Respond with the user details
        res.status(200).json(member);
    } catch (err) {
        // Handle any errors that occur during retrieval
        next(err);
    }
});

// Handle GET request to retrieve a sample of user data
router.get("/allUser", async (req, res, next) => {
    try {
        // Retrieve a sample of user data (e.g., 20 users)
        const allUserData = await Member.aggregate([{ $sample: { size: 20 } }]);
        // Respond with the sampled user data
        res.status(200).json(allUserData);
    } catch (error) {
        // Handle any errors that occur during retrieval
        next(error);
    }
});

// Export the router for use in the application
export default router;
