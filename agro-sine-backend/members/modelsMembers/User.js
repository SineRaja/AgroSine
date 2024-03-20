import mongoose from "mongoose";

const MemberSchema = new mongoose.Schema({
    memberName: {
        type: String,
        required: true,
        unique: true,
    },
    memberEmail: {
        type: String,
        required: true,
        unique: true,
    },
    memberPhoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    memberPassword: {
        type: String,
        required: true,
    },
    memberImg: {
        type: String,
    },
    memberType: {
        type: String,
        required: true
    }
}, { timestamps: true }
);

export default mongoose.model("Member", MemberSchema);