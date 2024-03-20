import express from "express";
import mongoose from 'mongoose';
import memberRoutes from '../agro-sine-backend/members/routesMembers/users.js';
import cropDiseaseRoutes from '../agro-sine-backend/farmers/routesFarmer/cropDatas.js';
import authenticationMember from '../agro-sine-backend/members/routesMembers/userAuthentication.js';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cartRoute from '../agro-sine-backend/customer/customerRoute/customerCart.js';
import customerOrderRoute from '../agro-sine-backend/customer/customerRoute/customerOrdered.js';
import vegetableRoute from '../agro-sine-backend/customer/customerRoute/vegetables.js';
import converstationRoute from '../agro-sine-backend/chatAgroSci/routes/agroConverstation.js';
import messageRoute from '../agro-sine-backend/chatAgroSci/routes/agroMessages.js';


const app = express()

dotenv.config()

const connect = () => {
    mongoose
    .connect(process.env.MONGOCONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("AgroSine Database is Conneted...");
    })
    .catch((err) => { 
        throw err 
    });
}

app.use(cookieParser())
app.use(express.json())
app.use("/api/authentication",authenticationMember)
app.use("/api/members", memberRoutes)
app.use("/api/cropdiseasedata",cropDiseaseRoutes)
app.use("/api/customerVegetable", vegetableRoute)
app.use("/api/cartitems",cartRoute)
app.use("/api/orderItems",customerOrderRoute)
app.use("/api/converstation",converstationRoute)
app.use("/api/messages",messageRoute)

app.use((err, req, res, next)=> {
    const status = err.status || 500;
    const message = err.message || "Please Wait, Something went wrong to the Server";
    return res.status(status).json({
        success:false,
        status,
        message
    })
})


app.listen(8800, () => {
    connect()
    console.log("AgroSine Connected to Server...");
})

