import User from "../models/User.js";

export const verifyApiKey = async (req, res, next) => {
    const apiKey = req.body.key
    if (!apiKey) {
        return res.status(401).json({success: false, msg: "API key is missing" });
    }
    const user = await User.findOne({ apiKey });
    // console.log(user);
    
    if (!user) return res.status(401).json({success: false, msg: "Invalid API key" });
    req.user = user;

    next();
};