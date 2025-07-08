import React, { useState, useRef } from 'react';
import { useKycUpload } from '../../../hooks/useKycUpload';

const KycUpload = ({ onSuccess }) => {  // Accept onSuccess prop
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [documentType, setDocumentType] = useState('');
    const [documentNumber, setDocumentNumber] = useState('');
    const [previewUrls, setPreviewUrls] = useState([]);
    const fileInputRef = useRef(null);

    const {
        uploadKycDocuments,
        loading,
        successMessage,
        errorMessage,
        uploadProgress,
        resetMessages,
    } = useKycUpload();

    const documentTypes = [
        { value: 'passport', label: 'Passport' },
        { value: 'drivingLincense', label: 'Driving License' },
        { value: 'aadharCard', label: 'Aadhar Card' },
        { value: 'voterId', label: 'Voter ID' },
        { value: 'panCard', label: 'PAN Card' },
        { value: 'other', label: 'Other' },
    ];

    const handleFileSelect = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(files);
        resetMessages();

        // Create preview URLs for images
        const urls = files.map(file => {
            if (file.type.startsWith('image/')) {
                return URL.createObjectURL(file);
            }
            return null;
        });
        setPreviewUrls(urls);
    };

    const handleRemoveFile = (index) => {
        const newFiles = selectedFiles.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);
        setSelectedFiles(newFiles);
        setPreviewUrls(newUrls);

        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await uploadKycDocuments(selectedFiles, documentType, documentNumber);

        if (result.success) {
            // Reset form on success
            setSelectedFiles([]);
            setDocumentType('');
            setDocumentNumber('');
            setPreviewUrls([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }

            // Call onSuccess callback after a short delay to show success message
            if (onSuccess) {
                setTimeout(() => {
                    onSuccess();
                }, 1500); // Give user time to see the success message
            }
        }
    };

    const handleReset = () => {
        setSelectedFiles([]);
        setDocumentType('');
        setDocumentNumber('');
        setPreviewUrls([]);
        resetMessages();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6">Upload KYC Documents</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Document Type */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Type *
                    </label>
                    <select
                        value={documentType}
                        onChange={(e) => setDocumentType(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                        disabled={loading}
                    >
                        <option value="">Select Document Type</option>
                        {documentTypes.map((type) => (
                            <option key={type.value} value={type.value}>
                                {type.label}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Document Number */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Document Number *
                    </label>
                    <input
                        type="text"
                        value={documentNumber}
                        onChange={(e) => setDocumentNumber(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter document number"
                        required
                        disabled={loading}
                    />
                </div>

                {/* File Upload */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Upload Documents *
                    </label>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,.pdf"
                        onChange={handleFileSelect}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        disabled={loading}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                        You can select multiple files. Accepted formats: Images and PDF
                    </p>
                </div>

                {/* File Preview */}
                {selectedFiles.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium text-gray-700">Selected Files:</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {selectedFiles.map((file, index) => (
                                <div key={index} className="relative border rounded-lg p-2">
                                    {previewUrls[index] ? (
                                        <img
                                            src={previewUrls[index]}
                                            alt={file.name}
                                            className="w-full h-32 object-cover rounded"
                                        />
                                    ) : (
                                        <div className="w-full h-32 flex items-center justify-center bg-gray-100 rounded">
                                            <span className="text-sm text-gray-500">{file.name}</span>
                                        </div>
                                    )}
                                    <button
                                        type="button"
                                        onClick={() => handleRemoveFile(index)}
                                        className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                        disabled={loading}
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Upload Progress */}
                {loading && uploadProgress > 0 && (
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div
                            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
                            style={{ width: `${uploadProgress}%` }}
                        ></div>
                    </div>
                )}

                {/* Success Message */}
                {successMessage && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-md">
                        {successMessage}
                    </div>
                )}

                {/* Error Message */}
                {errorMessage && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-md">
                        {errorMessage}
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4">
                    <button
                        type="submit"
                        disabled={loading || selectedFiles.length === 0}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Uploading...' : 'Upload KYC Documents'}
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        disabled={loading}
                        className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:cursor-not-allowed transition-colors"
                    >
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default KycUpload;