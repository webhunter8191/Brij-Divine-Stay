import mongoose from "mongoose"


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:[true,"enter name"]
    },
    email: {
        type: String,
        required:[true,'enter email']
    },
    password: {
        type: String,
        required:[true,"enter password"]
    },
    address: {
        type: String,
        trim:true
    },
    role: {
        type: String,
        enum: ["user", "admin "],
        required:true,
        default:'user'
    }
    
})

export const User = mongoose.model('User', userSchema);