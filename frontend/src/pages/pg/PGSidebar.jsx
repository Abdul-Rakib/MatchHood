import React from 'react';

const PGSidebar = ({ pgDetails }) => {
  const formatLandmarks = (landmarks) => {
    if (!landmarks || !Array.isArray(landmarks)) return [];
    return landmarks;
  };

  return (
    <div className="lg:sticky lg:top-8 space-y-6">
      {/* Pricing */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Pricing</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Room Price</span>
            <span className="font-semibold text-emerald-600 text-lg">{pgDetails.price}</span>
          </div>
          {pgDetails.deposit_amount && (
            <div className="flex justify-between">
              <span className="text-gray-600">Deposit</span>
              <span className="font-medium">{pgDetails.deposit_amount}</span>
            </div>
          )}
          {pgDetails.maintenance_charges && pgDetails.maintenance_charges !== '-' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Maintenance</span>
              <span className="font-medium">{pgDetails.maintenance_charges}</span>
            </div>
          )}
          {pgDetails.electricity_charges && pgDetails.electricity_charges !== '-' && (
            <div className="flex justify-between">
              <span className="text-gray-600">Electricity</span>
              <span className="font-medium">{pgDetails.electricity_charges}</span>
            </div>
          )}
        </div>
      </div>

      {/* Room Details */}
      {pgDetails.room_details && pgDetails.room_details.length > 0 && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Room Details</h2>
          <div className="space-y-2">
            {pgDetails.room_details.map((room, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-700">{room}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Basic Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Info</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Gender</span>
            <span className="font-medium">{pgDetails.gender}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">AC Available</span>
            <span className="font-medium">{pgDetails.ac_rooms}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Total Beds</span>
            <span className="font-medium">{pgDetails.total_beds}</span>
          </div>
          {pgDetails.notice_period && (
            <div className="flex justify-between">
              <span className="text-gray-600">Notice Period</span>
              <span className="font-medium">{pgDetails.notice_period}</span>
            </div>
          )}
          {pgDetails.operating_since && (
            <div className="flex justify-between">
              <span className="text-gray-600">Operating Since</span>
              <span className="font-medium">{pgDetails.operating_since}</span>
            </div>
          )}
          {pgDetails.parking_details && (
            <div className="flex justify-between">
              <span className="text-gray-600">Parking</span>
              <span className="font-medium">{pgDetails.parking_details}</span>
            </div>
          )}
          {pgDetails.power_backup && (
            <div className="flex justify-between">
              <span className="text-gray-600">Power Backup</span>
              <span className="font-medium">{pgDetails.power_backup}</span>
            </div>
          )}
        </div>
      </div>

      {/* Owner Info */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Owner Details</h2>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Name</span>
            <span className="font-medium">{pgDetails.owner_name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Type</span>
            <span className="font-medium">{pgDetails.owner_type}</span>
          </div>
          {pgDetails.owner_phone && (
            <div className="flex justify-between">
              <span className="text-gray-600">Phone</span>
              <span className="font-medium">{pgDetails.owner_phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* Landmarks */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Landmarks</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {formatLandmarks(pgDetails.landmarks).map((landmark, index) => (
            <div key={index} className="flex items-start space-x-2">
              <svg className="w-4 h-4 text-emerald-500 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-sm text-gray-600">{landmark}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Button */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-4 rounded-md font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105">
          Contact Owner
        </button>
        <div className="mt-3 text-center">
          <button className="w-full bg-white border-2 border-emerald-500 text-emerald-500 py-2 px-4 rounded-md font-medium hover:bg-emerald-50 transition-all duration-300">
            Schedule Visit
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 bg-blue-50 text-blue-600 py-2 px-3 rounded-md hover:bg-blue-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <span className="text-sm">Save</span>
          </button>
          <button className="flex items-center justify-center space-x-2 bg-green-50 text-green-600 py-2 px-3 rounded-md hover:bg-green-100 transition-colors">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
            </svg>
            <span className="text-sm">Share</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PGSidebar;