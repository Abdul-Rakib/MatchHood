import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "merchant", "admin"],
        default: "user",
    },
    isActive: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    apiKey: {
        type: String,
        required: true,
        unique: true,
    },
    websiteName: {
        type: String,
    },
    websiteLogo: {
        type: String,
    },
    websiteUrl: {
        type: String,
    },
    webhookUrl: {
        type: String,
    },
    isMerchantConnected: {
        type: Boolean,
        default: false,
    },
    merchantProvider: {
        type: String,
        default:"",  
    },
    merchantId: {
        type: String,
        default:"",
    },
    merchantUpiId: {
        type: String,
        default:"",
    },
    merchantName: {
        type: String,
        default:"",
    },
    remarks: {
        type: String,
        default: "",
    },

}, { timestamps: true });

const User = mongoose.model("User", userSchema);

export default User;
