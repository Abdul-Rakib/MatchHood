import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

async function generateUserId() {
    const lastUser = await User.findOne().sort({ userId: -1 }).limit(1); // Sort by `userid` in descending order
    const nextUserId = lastUser ? Number(lastUser.userId) + 1 : 1000;
    return nextUserId.toString();
}

function generateApiKey(userId) {
    const randomHex = Math.random().toString(16).substring(2, 8).toUpperCase(); // 6-char random hex
    const timestamp = Date.now().toString(16).slice(-6).toUpperCase(); // last 6 of timestamp in hex
    return `GMC-${userId}-${randomHex}-${timestamp}`;
}  

export const register = async (req, res) => {

    const { name, email, mobileNumber, password } = req.body;
    if (!name || !email || !mobileNumber || !password) {
        return res.status(400).json({ success: false, msg: "All fields are required" });
    }
    try {
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);      

        const newUserId = await generateUserId();

        const newUser = new User({
            name,
            mobileNumber,
            email,
            password: passwordHash,
            userId: newUserId,
            apiKey: generateApiKey(await generateUserId()),
        });
        const savedUser = await newUser.save();

        const userData = {
            _id: savedUser._id,
            userid: savedUser.userId,
            name: savedUser.name,
            email: savedUser.email,
            mobileNumber: savedUser.mobileNumber,
            role: savedUser.role,
        }

        return res.status(201).json({ success: true, msg: "User created successfully", data: userData });
    } catch (error) {
        return res.status(500).json({ success: false, msg: "Internal server error", error });
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        
        if (!email || !password) {
            return res.status(400).json({ success: false, msg: "Please fill all fields" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, msg: "User not found. Please register." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ success: false, msg: "Invalid Login Details. Please try again or reset your password. " });

        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '6h' });

        // Only include necessary fields in the response
        const userData = {
            _id: user._id,
            userid: user.userId,
            name: user.name,
            email: user.email,
            mobileNumber: user.mobileNumber,
            role: user.role,
            websiteName: user.websiteName,
            websiteUrl: user.websiteUrl,
        };

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // only send over HTTPS in production
            sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
            maxAge: 6 * 60 * 60 * 1000, // 6 hours
        });
        res.status(200).json({ success: true, msg: "logged in", data: userData });
    } catch (err) {
        res.status(500).json({ success: false, msg: "server error", msg: err.message });
    }
};