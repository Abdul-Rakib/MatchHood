import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import usePGDetails from '../../../hooks/usePGDetails';
import PGSidebar from './PGSidebar'; // Assuming PGSidebar is in the same directory

const PGDetailsPage = () => {
  const { pg_id } = useParams();
  const navigate = useNavigate();
  const { fetchPGDetails, loading, error, pgDetails } = usePGDetails();
  const [activeTab, setActiveTab] = useState('');

  useEffect(() => {
    if (pg_id) {
      fetchPGDetails(pg_id);
    }
  }, [pg_id]);

  // Initialize active tab when pgDetails loads
  useEffect(() => {
    if (pgDetails?.nearby_landmarks_by_category) {
      const categories = Object.keys(pgDetails.nearby_landmarks_by_category);
      if (categories.length > 0 && !activeTab) {
        setActiveTab(categories[0]);
      }
    }
  }, [pgDetails, activeTab]);

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

  const formatCategoryName = (category) => {
    return category.replace(/([A-Z])/g, ' $1').trim();
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">

          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Images */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Photos</h2>
              {/* Mobile: Horizontal scroll, Desktop: Grid */}
              <div className="md:hidden">
                <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
                  {pgDetails.all_photos && pgDetails.all_photos.length > 0 ? (
                    pgDetails.all_photos.slice(0, 4).map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`${pgDetails.title} - Photo ${index + 1}`}
                        className="w-60 h-48 object-cover rounded-lg flex-shrink-0"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    ))
                  ) : (
                    <div className="w-60 h-48 bg-gray-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>
              {/* Desktop: Grid */}
              <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {/* Mobile: Horizontal scroll, Desktop: Grid */}
              <div className="md:hidden">
                <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
                  {formatAmenities(pgDetails.common_amenities).map((amenity, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-50 px-3 py-2 rounded-lg whitespace-nowrap flex-shrink-0">
                      <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* Desktop: Grid */}
              <div className="hidden md:grid grid-cols-2 md:grid-cols-3 gap-3">
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

            {/* Food Details */}
            {pgDetails.food_details && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Food Details</h2>
                {/* Mobile: Horizontal scroll, Desktop: Grid */}
                <div className="md:hidden">
                  <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
                    {Object.entries(pgDetails.food_details).map(([key, value]) => (
                      <div key={key} className="flex-shrink-0 w-48 p-3 bg-gray-50 rounded-lg">
                        <div className="text-gray-600 text-sm mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className="font-medium text-gray-900">{value}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Desktop: Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(pgDetails.food_details).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium text-gray-900">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* House Rules */}
            {pgDetails.house_rules && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">House Rules</h2>
                {/* Mobile: Horizontal scroll, Desktop: Grid */}
                <div className="md:hidden">
                  <div className="flex gap-4 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
                    {Object.entries(pgDetails.house_rules).map(([key, value]) => (
                      <div key={key} className="flex-shrink-0 w-48 p-3 bg-gray-50 rounded-lg">
                        <div className="text-gray-600 text-sm mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                        <div className={`font-medium ${value === 'Yes' ? 'text-green-600' : value === 'No' ? 'text-red-600' : 'text-gray-900'}`}>
                          {value}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Desktop: Grid */}
                <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(pgDetails.house_rules).map(([key, value]) => (
                    <div key={key} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className={`font-medium ${value === 'Yes' ? 'text-green-600' : value === 'No' ? 'text-red-600' : 'text-gray-900'}`}>
                        {value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Nearby Places with Tabs */}
            {pgDetails.nearby_landmarks_by_category && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Nearby Places</h2>

                {/* Tab Navigation - Horizontal scroll on mobile */}
                <div className="mb-4 border-b border-gray-200">
                  <div className="flex gap-2 overflow-x-auto pb-2" style={{ scrollbarWidth: 'thin' }}>
                    {Object.entries(formatNearbyPlaces(pgDetails.nearby_landmarks_by_category)).map(([category, places]) => (
                      <button
                        key={category}
                        onClick={() => setActiveTab(category)}
                        className={`px-4 py-2 text-sm font-medium rounded-t-lg transition-colors duration-200 whitespace-nowrap flex-shrink-0 ${activeTab === category
                          ? 'text-emerald-600 border-b-2 border-emerald-600 bg-emerald-50'
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                          }`}
                      >
                        {formatCategoryName(category)}
                        {Array.isArray(places) && (
                          <span className="ml-1 text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                            {places.length}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="min-h-[200px]">
                  {activeTab && pgDetails.nearby_landmarks_by_category[activeTab] && (
                    <div className="space-y-2">
                      {Array.isArray(pgDetails.nearby_landmarks_by_category[activeTab]) ? (
                        pgDetails.nearby_landmarks_by_category[activeTab].map((place, index) => (
                          <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex-1">
                              <span className="text-sm font-medium text-gray-800">{place.name}</span>
                              {place.localityName && (
                                <span className="text-xs text-gray-500 ml-2">• {place.localityName}</span>
                              )}
                              {place.categoryName && (
                                <div className="text-xs text-gray-400 mt-1">{place.categoryName}</div>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-emerald-600 font-medium">{place.distance}</span>
                              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-gray-500">
                          <svg className="w-12 h-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          <p>No places found in this category</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Container with sticky-friendly styles */}
          <div className="lg:col-span-1 h-fit">
            <div className="sticky top-24">
              <PGSidebar pgDetails={pgDetails} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PGDetailsPage;