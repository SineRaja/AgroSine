// Import necessary modules and controller functions
import express from 'express';
import mongoose from "mongoose";
import User from "../modelsMembers/User.js";
import bcrypt from 'bcryptjs';
import { createOwnError } from "../../errorCreatetor.js";
import jwt from "jsonwebtoken";

// Create an Express Router instance
const router = express.Router();

// Route for logging in a member using credentials
router.post("/loginuser", async (req, res, next) => {
    try {
        // Find the member by their memberName in the database
        const loginMember = await User.findOne({ memberName: req.body.memberName });
        
        // Check if the member exists
        if (!loginMember) return next(createOwnError(404, "The Member has not been found!"));

        // Compare the provided memberPassword with the stored hashed password
        const isMatched = await bcrypt.compare(req.body.memberPassword, loginMember.memberPassword);

        // If passwords do not match, return an error
        if (!isMatched) return next(createOwnError(400, "Sorry, You Entered the Wrong Password! Please re-enter your password."));

        // Create a JWT token for the authenticated member
        const token = jwt.sign({ id: loginMember._id }, process.env.JWT);

        // Exclude the memberPassword field and send the remaining data in the response
        const { memberPassword, ...remainingData } = loginMember._doc;

        // Set the access token as an HTTP-only cookie and send the response
        res.cookie("access_token", token, {
            httpOnly: true
        }).status(200).json(remainingData);
    } catch (error) {
        // Handle any errors that occur during login
        next(error);
    }
});

// Route for creating a new member account
router.post("/createaccount", async (req, res, next) => {
    try {
        // Generate a salt and hash the memberPassword before storing it
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.memberPassword, salt);

        // Create a new account with the hashed memberPassword
        const newAccount = new User({ ...req.body, memberPassword: hash });

        // Save the new account to the database
        await newAccount.save();

        // Send a success response
        res.status(200).send("Successfully, Account created!");
    } catch (err) {
        // Handle any errors that occur during account creation
        next(err);
    }
});

// Export the router for use in the application
export default router;
