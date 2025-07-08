import React, { useState, useEffect } from 'react';
import axios from 'axios';
import KycUpload from './kycUpload';

const KycStatus = () => {
  const [kycData, setKycData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const statusConfig = {
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-300',
      icon: '⏳',
      text: 'Pending Verification',
      bgColor: 'bg-yellow-50'
    },
    approved: {
      color: 'bg-green-100 text-green-800 border-green-300',
      icon: '✓',
      text: 'Verified',
      bgColor: 'bg-green-50'
    },
    rejected: {
      color: 'bg-red-100 text-red-800 border-red-300',
      icon: '✗',
      text: 'Rejected',
      bgColor: 'bg-red-50'
    }
  };

  const documentTypeLabels = {
    passport: 'Passport',
    drivingLincense: 'Driving License',
    aadharCard: 'Aadhar Card',
    voterId: 'Voter ID',
    panCard: 'PAN Card',
    other: 'Other Document'
  };

  useEffect(() => {
    fetchKycStatus();
  }, []);

  const fetchKycStatus = async () => {
    try {
      const response = await axios.get('/api/v1/user/kyc-status');
      if (response.data?.success) {
        setKycData(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching KYC status:', error);
      setKycData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    setShowUploadForm(false);
    fetchKycStatus(); // Refresh KYC data
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="grid grid-cols-3 gap-4 mt-6">
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
              <div className="h-24 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">KYC Verification</h1>
        <p className="text-gray-600 mt-2">Manage your identity verification documents</p>
      </div>

      {kycData ? (
        <>
          {/* KYC Status Card */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
            {/* Status Header */}
            <div className={`p-6 ${statusConfig[kycData.status]?.bgColor || 'bg-gray-50'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${statusConfig[kycData.status]?.color}`}>
                    {statusConfig[kycData.status]?.icon}
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900">Document Status</h2>
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${statusConfig[kycData.status]?.color}`}>
                      {statusConfig[kycData.status]?.text}
                    </span>
                  </div>
                </div>
                {kycData.status !== 'approved' && (
                  <button
                    onClick={() => setShowUploadForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    Update Documents
                  </button>
                )}
              </div>
            </div>

            {/* Document Information */}
            <div className="p-6 border-b">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Document Type</h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {documentTypeLabels[kycData.documentType] || kycData.documentType}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-2">Document Number</h3>
                  <p className="text-lg font-semibold text-gray-900">{kycData.documentNumber}</p>
                </div>
              </div>
            </div>

            {/* Document Images */}
            {kycData.documentImage && kycData.documentImage.length > 0 && (
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">Uploaded Documents</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {kycData.documentImage.map((imageUrl, index) => (
                    <div
                      key={index}
                      className="relative group cursor-pointer rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow"
                      onClick={() => setSelectedImage(imageUrl)}
                    >
                      <div className="aspect-w-4 aspect-h-3">
                        <img
                          src={imageUrl}
                          alt={`Document ${index + 1}`}
                          className="w-full h-32 object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                      </div>
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-200 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                        <p className="text-white text-xs font-medium">Document {index + 1}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Upload Form Modal */}
          {showUploadForm && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
              <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b flex items-center justify-between sticky top-0 bg-white">
                  <h2 className="text-xl font-semibold">Update KYC Documents</h2>
                  <button
                    onClick={() => setShowUploadForm(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div className="p-6">
                  <KycUpload onSuccess={handleUploadSuccess} />
                </div>
              </div>
            </div>
          )}
        </>
      ) : (
        /* No KYC Data - Show Upload Section */
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Start Your KYC Verification</h2>
            <p className="text-gray-600 mb-8">Upload your documents to verify your identity and unlock all features</p>
          </div>
          <KycUpload onSuccess={handleUploadSuccess} />
        </div>
      )}

      {/* Image Preview Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <img
              src={selectedImage}
              alt="Document Preview"
              className="max-w-full max-h-full rounded-lg"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 p-2 bg-white rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default KycStatus;