import React, { useState } from 'react';
import { getBackendAreaName, availableAreas } from '../../utils/areaMapping';

const PGSearchForm = ({ onSearch, onMatchPreferences, loading }) => {
  const [searchType, setSearchType] = useState('area'); // 'area' or 'match'
  const [areaQuery, setAreaQuery] = useState('');
  const [preferences, setPreferences] = useState({
    budget: '',
    gender: '',
    foodPreference: '',
    amenities: [],
    area: ''
  });

  const handleAreaSearch = (e) => {
    e.preventDefault();
    if (areaQuery.trim()) {
      // Convert display name to backend format
      const backendAreaName = getBackendAreaName(areaQuery.trim());
      onSearch(backendAreaName);
    }
  };

  const handlePreferenceMatch = (e) => {
    e.preventDefault();
    
    // Transform preferences to match backend expectations
    const transformedPreferences = {
      budgetMin: 0,
      budgetMax: Infinity,
      gender: preferences.gender || '',
      foodPreference: preferences.foodPreference || '',
      amenities: preferences.amenities || [],
      preferredLocation: preferences.area ? getBackendAreaName(preferences.area) : ''
    };

    // Parse budget range
    if (preferences.budget) {
      const budgetRanges = {
        '0-10000': { min: 0, max: 10000 },
        '10000-20000': { min: 10000, max: 20000 },
        '20000-30000': { min: 20000, max: 30000 },
        '30000+': { min: 30000, max: Infinity }
      };
      
      const range = budgetRanges[preferences.budget];
      if (range) {
        transformedPreferences.budgetMin = range.min;
        transformedPreferences.budgetMax = range.max;
      }
    }

    onMatchPreferences(transformedPreferences);
  };

  const handleAmenityToggle = (amenity) => {
    setPreferences(prev => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter(a => a !== amenity)
        : [...prev.amenities, amenity]
    }));
  };

  const availableAmenities = [
    { name: 'AC', icon: '❄️' },
    { name: 'WiFi', icon: '📶' },
    { name: 'Parking', icon: '🚗' },
    { name: 'Laundry', icon: '👕' },
    { name: 'Gym', icon: '💪' },
    { name: 'Food', icon: '🍽️' },
    { name: 'Power Backup', icon: '⚡' },
    { name: 'TV', icon: '📺' }
  ];

  const areas = availableAreas;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 mb-6 border border-gray-100">      
      {/* Enhanced Search Type Toggle */}
      <div className="flex mb-8 bg-gray-100 rounded-xl p-1">
        <button
          onClick={() => setSearchType('area')}
          className={`flex-1 py-3 px-6 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
            searchType === 'area'
              ? 'bg-white text-emerald-600 shadow-md transform scale-105'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span>Search by Area</span>
        </button>
        <button
          onClick={() => setSearchType('match')}
          className={`flex-1 py-3 px-6 text-sm font-medium rounded-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
            searchType === 'match'
              ? 'bg-white text-emerald-600 shadow-md transform scale-105'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
          <span>Match Preferences</span>
        </button>
      </div>

      {/* Area Search Form */}
      {searchType === 'area' && (
        <div className="animate-fade-in">
          <form onSubmit={handleAreaSearch} className="space-y-6">
            <div className="relative">
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                Select Area
              </label>
              <div className="relative">
                <select
                  value={areaQuery}
                  onChange={(e) => setAreaQuery(e.target.value)}
                  className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                >
                  <option value="">Choose an area</option>
                  {areas.map(area => (
                    <option key={area} value={area}>{area}</option>
                  ))}
                </select>
                <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                <svg className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <button
              type="submit"
              disabled={loading || !areaQuery}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Search PGs</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}

      {/* Preference Matching Form */}
      {searchType === 'match' && (
        <div className="animate-fade-in">
          <form onSubmit={handlePreferenceMatch} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Budget */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                  Budget Range
                </label>
                <div className="relative">
                  <select
                    value={preferences.budget}
                    onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="">Any Budget</option>
                    <option value="0-10000">₹0 - ₹10,000</option>
                    <option value="10000-20000">₹10,000 - ₹20,000</option>
                    <option value="20000-30000">₹20,000 - ₹30,000</option>
                    <option value="30000+">₹30,000+</option>
                  </select>
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                  </svg>
                </div>
              </div>

              {/* Gender */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  Gender Preference
                </label>
                <div className="relative">
                  <select
                    value={preferences.gender}
                    onChange={(e) => setPreferences(prev => ({ ...prev, gender: e.target.value }))}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="">Any</option>
                    <option value="Boys">Boys Only</option>
                    <option value="Girls">Girls Only</option>
                    <option value="Coed">Coed</option>
                  </select>
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>

              {/* Food Preference */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Food Preference
                </label>
                <div className="relative">
                  <select
                    value={preferences.foodPreference}
                    onChange={(e) => setPreferences(prev => ({ ...prev, foodPreference: e.target.value }))}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="">Any</option>
                    <option value="Veg">Vegetarian</option>
                    <option value="Non-Veg">Non-Vegetarian</option>
                    <option value="Both">Both</option>
                  </select>
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                </div>
              </div>

              {/* Area */}
              <div className="relative">
                <label className="block text-sm font-semibold text-gray-700 mb-3">
                  <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                  Preferred Area
                </label>
                <div className="relative">
                  <select
                    value={preferences.area}
                    onChange={(e) => setPreferences(prev => ({ ...prev, area: e.target.value }))}
                    className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-300 appearance-none bg-white"
                  >
                    <option value="">Any Area</option>
                    {areas.map(area => (
                      <option key={area} value={area}>{area}</option>
                    ))}
                  </select>
                  <svg className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Amenities */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                <svg className="w-4 h-4 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                </svg>
                Preferred Amenities
              </label>
              
              {/* Mobile: Horizontal scroll */}
              <div className="md:hidden">
                <div className="flex gap-3 overflow-x-auto pb-4" style={{ scrollbarWidth: 'thin' }}>
                  {availableAmenities.map(amenity => (
                    <label
                      key={amenity.name}
                      className={`flex items-center space-x-2 px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 whitespace-nowrap flex-shrink-0 ${
                        preferences.amenities.includes(amenity.name)
                          ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg transform scale-105'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={preferences.amenities.includes(amenity.name)}
                        onChange={() => handleAmenityToggle(amenity.name)}
                        className="sr-only"
                      />
                      <span className="text-lg">{amenity.icon}</span>
                      <span className="text-sm font-medium">{amenity.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Desktop: Grid */}
              <div className="hidden md:grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableAmenities.map(amenity => (
                  <label
                    key={amenity.name}
                    className={`flex items-center space-x-3 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      preferences.amenities.includes(amenity.name)
                        ? 'bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg transform scale-105'
                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 hover:border-emerald-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={preferences.amenities.includes(amenity.name)}
                      onChange={() => handleAmenityToggle(amenity.name)}
                      className="sr-only"
                    />
                    <span className="text-xl">{amenity.icon}</span>
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-4 px-6 rounded-xl font-semibold hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 hover:shadow-lg flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <svg className="animate-spin w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  <span>Matching...</span>
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <span>Find Perfect Match</span>
                </>
              )}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PGSearchForm;