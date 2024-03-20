import {createOwnError} from '../../errorCreatetor.js';
import CropData from '../modelsFarmer/CropData.js';

export const addCropDiseaseDetails = async (req, res, next) => {
    const newCropDiseaseData = new CropData({userId: req.user.id, ...req.body});
    try{
        const saveCropDiseaseDetails  = await newCropDiseaseData.save();
        res.status(200).json(saveCropDiseaseDetails);
    }catch(err){
        next(err)
    }
}

export const updateCropDiseaseDetails = async (req, res, next) => {

    try {
        const CropDiseaseData = await CropData.findById(req.params.id);
        if (!CropDiseaseData) return next(createOwnError(404,"Crop Disease Data is not found"));
        
        if(req.user.id === CropDiseaseData.memberId){
            const updateCropDiseaseDetails = await CropData.findByIdAndUpdate(
                req.params.id,
                {
                    $set:req.body,
                },
                {
                    new:true
                });
            res.status(200).json(updateCropDiseaseDetails)
        }else{
            return next(createOwnError(403, "You are not authorized user to update the disease details!!!"));
        }
    }catch (err){
        next(err)
    }
}

export const deleteCropDiseaseDetails = async (req, res, next) => {
    try {
        const cropData = await CropData.findById(req.params.id);
        if(!cropData) return next(createOwnError(404, "Crop Details are not found from database!"))
        if(req.user.id === cropData.memberId){
            await CropData.findByIdAndDelete(
                req.params.id,
            );
            res.status(200).json("Crop Details are been Deleted...!!!")
        }else{
            return next(createOwnError(403, "Sorry, you can't delete other data..Please signin for deleting data!"))
        }
    }catch (err){
        next(err)
    }
}

export const getCropDetails = async (req, res, next) => {
    try{
        const cropData = await CropData.findById(req.params.id)
        res.status(200).json(cropData)
    }catch (err){
        next(err)
    }
}

export const normalCropData = async (req, res, next) => {
    try{
        const cropData = await CropData.aggregate([{$sample: { size: 20}}])
        res.status(200).json(cropData)
    }catch (err){
        next(err)
    }
}

export const dataSearchEngine = async (req, res, next) => {
    const query = req.query.q 
    try{
        const cropData = await CropData.find({diseaseName: {$regex: query, $options: "i"}}).limit(20);
        res.status(200).json(cropData)
    }
    catch (err){
        next(err)
    }
}
