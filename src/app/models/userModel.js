import mongoose from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema = new mongoose.Schema({

    username: {
        type: String,
        required: [true, "Please Provide a Username"],
        unique: true
    },
    email: {
        type: String,
        required: [true, "Please Provide an email"],
        unique: true
    },
    password : {
        type: String,
        required: [true, "Please Provide a Password"], 
    },
    isVerified: {
        type: Boolean,
        default: false
        },
    isAdmin: {
        type: Boolean,
        default: false
    }
})

const User = mongoose.models.users || mongoose.model("User", userSchema);

export default User;