import mongoose from "mongoose";

const kycSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  documentType: {
    type: String,
    required: true,
    enum: ['passport', 'drivingLincense', 'aadharCard', 'voterId', 'panCard', 'other'],
  },
  documentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  documentImage: {
    type: Array,
    of: String, // Array of image URLs
    required: true,
  },
  documentImageId: {
    type: Array,
    of: String, // Array of image IDs from Cloudinary
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  }
}, {timestamps: true});

const Kyc = mongoose.model('Kyc', kycSchema);
export default Kyc;