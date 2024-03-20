import CustomerCart from "../customerModel/CustomerCart.js";
import { verifyingTokens } from "../../verifyingTokens.js";
import express from "express";

const router = express.Router();

// Create the Cart

router.post("/", verifyingTokens, async (req, res)=> {
    const newCusotmerCart = new CustomerCart(req.body);

    try {
        const savedCartItem = await newCusotmerCart.save();
        res.status(200).json(savedCartItem);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Update Customer Cart Items

router.put("/:id", verifyingTokens, async (req, res)=> {
    try {
        const updateCartItem = await CustomerCart.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            {
                new: true
            }
        );
        res.status(200).json(updateCartItem);
    } catch (error) {
        res.status(500).json(error)
    }
});

// Delete Cart Itmes
router.delete("/:id",verifyingTokens, async(req, res)=>{
    try {
        await CustomerCart.findByIdAndDelete(req.params.id);
        res.status(200).json("Cart Items has been Deleted....");
    } catch (error) {
        res.status(500).json(error)
    }
})

// Get User Cart Items Details 
router.get("/find/:userId",verifyingTokens, async(req, res)=>{
    try {
        const cartItems = await CustomerCart.findOne({userId: req.params.userId});
        res.status(200).json(cartItems)
    } catch (error) {
        res.status(500).json(error)
    }
});

// Get All Details 

router.get("/", verifyingTokens, async( req, res)=>{
    try {
        const cartList = await CustomerCart.find();
        res.status(200).json(cartList);
    } catch (error) {
        res.status(500).json(error)
    }
})

export default router;