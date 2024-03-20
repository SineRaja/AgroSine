import jwt from "jsonwebtoken"
import {createOwnError} from './errorCreatetor.js'

export const verifyingTokens = (req,res,next) => {
    const token = req.cookies.access_token
    if(!token) return next(createOwnError(401, "You are not Authenticated"))

    jwt.verify(token, process.env.JWT, (err,user)=> {
        if(err) return next(createOwnError(401, "Token is not valid"))
        req.user = user;
        next()
    })
}