import User from "../models/User.js";
import Kyc from "../models/Kyc.js";

export const kyc = async (req, res) => {
  try {
    const _id = req.user._id;
    const user = await User.findById(_id);

    if (!user) {
      return res.status(404).json({ success: false, msg: "Unauthorized" });
    }

    const kycData = await Kyc.findOne({ email: user.email });
    if (!kycData) {
      return res.status(404).json({ success: false, msg: "KYC data not found" });
    }

    res.status(200).json({
      success: true,
      msg: "KYC data fetched successfully",
      data: {
        documentType: kycData.documentType,
        documentNumber: kycData.documentNumber,
        status: kycData.status,
        documentImage: kycData.documentImage, // Assuming this is an array of image URLs
      }
      
    });
  } catch (error) {
    console.error("Error fetching KYC data:", error);
    return res.status(500).json({ success: false, msg: "Server error during fetching KYC data", error });
  }
};

export const editProfile = async (req, res) => {

  try {
    const { name, email, mobileNumber, websiteName, websiteUrl, currentPassword, newPassword } = req.body;
    if (!name || !email || !mobileNumber || !websiteName || !websiteUrl) {
      return res.status(400).json({ success: false, msg: "Please fill all fields" });
    }
    const _id = req.user._id;
    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ success: false, msg: "User not found" });
    }
    if (currentPassword && newPassword) {
      const isMatch = await bcrypt.compare(currentPassword, user.password);
      if (!isMatch) {
        return res.status(400).json({ success: false, msg: "Current password is incorrect" });
      }
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(newPassword, salt);
      user.password = passwordHash;
    }

    user.name = name;
    user.email = email;
    user.mobileNumber = mobileNumber;
    user.websiteName = websiteName;
    user.websiteUrl = websiteUrl;
    await user.save();

    const userData = {
      name: user.name,
      email: user.email,
      mobileNumber: user.mobileNumber,
      role: user.role,
      userId: user.userId,
      _id: user._id,
      websiteName: user.websiteName,
      websiteUrl: user.websiteUrl,
    }

    return res.status(200).json({ success: true, msg: "Profile updated successfully", data: userData });
  }
  catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, msg: "Server error during profile update", error });
  }
}