import { verifyingTokens } from "../../verifyingTokens.js";
import express from "express";
import CustomerOrder from "../customerModel/CustomerOrder.js";

const router = express.Router();

router.post("/", verifyingTokens, async (req, res)=>{
    const newOrderList = new CustomerOrder(req.body);
    try {
        const savedOrderItem = await newOrderList.save();
        res.status(200).json(savedOrderItem);
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/:id", verifyingTokens, async (req, res)=>{
    try {
        const updateOrderItem = await CustomerOrder.findByIdAndUpdate(
            req.params.id,{
                $set: req.body,
            },
            {
             new: true   
            }
        );
        res.status(200).json(updateOrderItem);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.delete("/:id", verifyingTokens, async(req, res)=>{
    try {
        await CustomerOrder.findOneAndDelete(req.params.id);
        res.status(200).json("Order Has Been Successfully Deleted...");
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/",verifyingTokens, async (req, res)=> {
    try {
        const allOrders = await CustomerOrder.find();
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json(error)
    }
});

export default router;