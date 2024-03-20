import {createOwnError} from '../../errorCreatetor.js';
import Member from '../modelsMembers/User.js';

export const updateMemeber = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try{
            const updateMemberDetails = await Member.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },
            { new: true }
            )
            res.status(200).json(updateMemberDetails)
        }catch (err){
            next(err)
        }
    }else{
        return next(createOwnError(403, "Sorry, You are not Autherized User to update Details!..PLease signin"))
    }
}

export const deleteMember = async (req, res, next) => {
    if(req.params.id === req.user.id){
        try{
            const deleteUser = await Member.findByIdAndDelete(req.params.id )
            res.status(200).json("Successfully, User has been deleted from Database!")
        }catch (err){
            next(err)
        }
    }else{
        return next(createOwnError(403, "Sorry, You are not authorized user to delete account!, PLease signin"))
    }
}

export const getMember = async (req, res, next) => {
    try{
        const member = await Member.findById(req.params.id)
        res.status(200).json(member)
    }catch (err){
        next(err)
    }
}

