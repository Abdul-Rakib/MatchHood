import { uploader } from 'cloudinary';
import fs from 'fs/promises'; // Promises API for fs
import User from '../models/User.js';
import Kyc from '../models/Kyc.js';

// Cloudinary image upload helper
const uploadToCloudinary = async (filePath) => {
    try {
        const result = await uploader.upload(filePath, {
            folder: 'MatchHoodKyc', // Optional: Specify a folder in Cloudinary
        });
        return result; // Return the full result object
    } catch (error) {
        throw new Error('Cloudinary upload failed');
    }
};

export const uploadCloudinaryImage = async (req, res) => {
    try {
        const _id = req.user._id;
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ success: false, msg: "Unauthorized" });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ success: false, msg: "Document is required" });
        }

        if (!req.body.documentType || !req.body.documentNumber) {
            // Delete uploaded files if validation fails
            for (const file of req.files || []) {
                await fs.unlink(file.path);
            }
            return res.status(400).json({ success: false, msg: "Document type and number are required" });
        }

        //Check if user already has KYC record
        const existingKyc = await Kyc.findOne({ userId: _id });

        if (existingKyc) {
            //Delete old images from Cloudinary
            for (const publicId of existingKyc.documentImageId) {
                try {
                    await uploader.destroy(publicId);
                } catch (err) {
                    console.warn(`Failed to delete image ${publicId}:`, err.message);
                }
            }

            //Remove the old KYC record
            await Kyc.findByIdAndDelete(existingKyc._id);
        }

        //Upload new files to Cloudinary
        const documentImage = [];
        const documentImageId = [];

        for (const file of req.files) {
            const result = await uploadToCloudinary(file.path);
            documentImage.push(result.secure_url);
            documentImageId.push(result.public_id);
            await fs.unlink(file.path);
        }

        //Save new KYC record
        const newKyc = new Kyc({
            userId: user._id,
            email: user.email,
            documentType: req.body.documentType,
            documentNumber: req.body.documentNumber,
            documentImage,
            documentImageId,
        });

        await newKyc.save();

        res.status(201).json({
            success: true,
            msg: "KYC documents uploaded successfully",
            data: {
                documentType: newKyc.documentType,
                documentNumber: newKyc.documentNumber,
                status: newKyc.status
            }
        });


    } catch (error) {
        console.error('Error uploading images:', error);
        res.status(500).json({ success: false, msg: "An error occurred while uploading KYC documents" });
    }
};

export const deleteFromCloudinary = async (req, res) => {
    const { imageId } = req.params;

    try {
        const imageDoc = await Kyc.findOne({ documentImageId: imageId });

        if (!imageDoc) {
            return res.status(404).json({ success: false, msg: 'Image not found in KYC documents' });
        }

        // Delete from Cloudinary
        const cloudinaryResult = await uploader.destroy(imageId);
        if (cloudinaryResult.result !== 'ok') {
            return res.status(500).json({ success: false, msg: 'Failed to delete image from Cloudinary' });
        }

        // Update DB document by removing the image from arrays
        imageDoc.documentImageId = imageDoc.documentImageId.filter(id => id !== imageId);
        imageDoc.documentImage = imageDoc.documentImage.filter((_, index) => imageDoc.documentImageId[index] !== imageId);

        // If no images left, delete the KYC doc entirely
        if (imageDoc.documentImage.length === 0) {
            await Kyc.findByIdAndDelete(imageDoc._id);
        } else {
            await imageDoc.save();
        }

        res.status(200).json({ success: true, msg: 'Image deleted successfully' });

    } catch (error) {
        console.error('Error deleting image:', error);
        res.status(500).json({ success: false, msg: 'An error occurred while deleting the image' });
    }
};