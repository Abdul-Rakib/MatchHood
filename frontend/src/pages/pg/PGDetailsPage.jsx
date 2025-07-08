import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePGDetails from '../../../hooks/usePGDetails';

const PGDetailsPage = () => {
  const { pg_id } = useParams();
  const navigate = useNavigate();
  const { fetchPGDetails, loading, error, pgDetails } = usePGDetails();

  useEffect(() => {
    if (pg_id) {
      fetchPGDetails(pg_id);
    }
  }, [pg_id]);

  const handleBackToSearch = () => {
    navigate('/search');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
          <p className="mt-4 text-gray-600">Loading PG details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
            <svg className="w-16 h-16 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="text-lg font-medium text-red-800 mb-2">PG Not Found</h3>
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={handleBackToSearch}
              className="bg-emerald-500 text-white px-4 py-2 rounded-md hover:bg-emerald-600 transition-colors"
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!pgDetails) {
    return null;
  }

  const formatAmenities = (amenities) => {
    if (!amenities || !Array.isArray(amenities)) return [];
    return amenities;
  };

  const formatLandmarks = (landmarks) => {
    if (!landmarks || !Array.isArray(landmarks)) return [];
    return landmarks;
  };

  const formatNearbyPlaces = (nearbyPlaces) => {
    if (!nearbyPlaces || typeof nearbyPlaces !== 'object') return {};
    return nearbyPlaces;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={handleBackToSearch}
            className="flex items-center text-emerald-600 hover:text-emerald-700 mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Search
          </button>
          <h1 className="text-3xl font-bold text-gray-900">{pgDetails.title}</h1>
          <p className="text-gray-600 mt-2">{pgDetails.location}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pgDetails.all_photos && pgDetails.all_photos.length > 0 ? (
                  pgDetails.all_photos.slice(0, 4).map((photo, index) => (
                    <img
                      key={index}
                      src={photo}
                      alt={`${pgDetails.title} - Photo ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ))
                ) : (
                  <div className="col-span-2 bg-gray-200 rounded-lg h-48 flex items-center justify-center">
                    <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed">{pgDetails.description}</p>
            </div>

            {/* Amenities */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {formatAmenities(pgDetails.common_amenities).map((amenity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Nearby Places */}
            {pgDetails.nearby_landmarks_by_category && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Places</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(formatNearbyPlaces(pgDetails.nearby_landmarks_by_category)).map(([category, places]) => (
                    <div key={category} className="space-y-2">
                      <h3 className="font-medium text-gray-900 capitalize">{category}</h3>
                      <div className="space-y-1">
                        {Array.isArray(places) ? places.slice(0, 3).map((place, index) => (
                          <p key={index} className="text-sm text-gray-600">{place}</p>
                        )) : (
                          <p className="text-sm text-gray-600">{places}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
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
              </div>
            </div>

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
              <div className="space-y-2">
                {formatLandmarks(pgDetails.landmarks).map((landmark, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <svg className="w-4 h-4 text-emerald-500 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
              <button className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-4 rounded-md font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300">
                Contact Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGDetailsPage;