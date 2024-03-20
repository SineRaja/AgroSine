import { verifyingTokens } from "../../verifyingTokens.js";
import express from "express";
import VegetableList from '../customerModel/Vegetables.js';

const router = express.Router();

router.post("/", verifyingTokens, async (req, res, next) => {
    const newVegetable = new VegetableList({userId: req.user.id, ...req.body});

    try {
        const savedVegetables = await newVegetable.save();
        res.status(200).json(savedVegetables);
    } catch (error) {
        next(error);
    }
});

router.put("/:id", verifyingTokens, async (req, res)=>{
    try {
        
        const updateVegetable = await VegetableList.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            }, {
                new: true
            }
        );
        res.status(200).json(updateVegetable);
    } catch (error) {
        res.status(500).json(error)
    }
});

router.delete("/:id",verifyingTokens, async (req,res)=>{
    try {
        await Vegetables.findByIdAndDelete(req.params.id);
        res.status(200).json("Vegetable has been deleted...");

    } catch (error) {
        res.status(500).json(error)
    }
});

router.get("/find/:id", async (req, res)=>{
    try {
        const vegetable = await VegetableList.findById(req.params.id);
        res.status(200).json(vegetable);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get("/",async (req, res)=> {
    const latestNewVegetable = req.query.new;
    const latestCategory = req.query.vegetbaleCategory;
    try {
        let vegetable;

        if(latestNewVegetable){
            vegetable = await VegetableList.find().sort({ createdAt: -1 }).limit(1);

        }else if (latestCategory) {
            vegetable = await VegetableList.find({
                vegetableType: {
                    $in: latestCategory,
                },
            });
        } else {
            vegetable = await VegetableList.find();
        }
        res.status(200).json(vegetable);
    } catch (error) {
        res.status(500).json(error);
    }

});

export default router;