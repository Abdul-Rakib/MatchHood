import React, { useState } from 'react';

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
      onSearch(areaQuery.trim());
    }
  };

  const handlePreferenceMatch = (e) => {
    e.preventDefault();
    onMatchPreferences(preferences);
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
    'AC', 'WiFi', 'Parking', 'Laundry', 'Gym', 'Food', 'Power Backup', 'TV'
  ];

  const areas = [
    'HSR Layout', 'Koramangala', 'Whitefield', 'Indiranagar', 'Jayanagar', 'Banashankari'
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Find Your Perfect PG</h2>
      
      {/* Search Type Toggle */}
      <div className="flex mb-6">
        <button
          onClick={() => setSearchType('area')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-l-lg transition-colors ${
            searchType === 'area'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Search by Area
        </button>
        <button
          onClick={() => setSearchType('match')}
          className={`flex-1 py-2 px-4 text-sm font-medium rounded-r-lg transition-colors ${
            searchType === 'match'
              ? 'bg-emerald-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Match Preferences
        </button>
      </div>

      {/* Area Search Form */}
      {searchType === 'area' && (
        <form onSubmit={handleAreaSearch} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Area
            </label>
            <select
              value={areaQuery}
              onChange={(e) => setAreaQuery(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            >
              <option value="">Choose an area</option>
              {areas.map(area => (
                <option key={area} value={area}>{area}</option>
              ))}
            </select>
          </div>
          
          <button
            type="submit"
            disabled={loading || !areaQuery}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-4 rounded-md font-medium hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? 'Searching...' : 'Search PGs'}
          </button>
        </form>
      )}

      {/* Preference Matching Form */}
      {searchType === 'match' && (
        <form onSubmit={handlePreferenceMatch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Budget Range
              </label>
              <select
                value={preferences.budget}
                onChange={(e) => setPreferences(prev => ({ ...prev, budget: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Any Budget</option>
                <option value="0-10000">₹0 - ₹10,000</option>
                <option value="10000-20000">₹10,000 - ₹20,000</option>
                <option value="20000-30000">₹20,000 - ₹30,000</option>
                <option value="30000+">₹30,000+</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender Preference
              </label>
              <select
                value={preferences.gender}
                onChange={(e) => setPreferences(prev => ({ ...prev, gender: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="Boys">Boys Only</option>
                <option value="Girls">Girls Only</option>
                <option value="Coed">Coed</option>
              </select>
            </div>

            {/* Food Preference */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Food Preference
              </label>
              <select
                value={preferences.foodPreference}
                onChange={(e) => setPreferences(prev => ({ ...prev, foodPreference: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Any</option>
                <option value="Veg">Vegetarian</option>
                <option value="Non-Veg">Non-Vegetarian</option>
                <option value="Both">Both</option>
              </select>
            </div>

            {/* Area */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Area
              </label>
              <select
                value={preferences.area}
                onChange={(e) => setPreferences(prev => ({ ...prev, area: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              >
                <option value="">Any Area</option>
                {areas.map(area => (
                  <option key={area} value={area}>{area}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {availableAmenities.map(amenity => (
                <label key={amenity} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={preferences.amenities.includes(amenity)}
                    onChange={() => handleAmenityToggle(amenity)}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <span className="text-sm text-gray-700">{amenity}</span>
                </label>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 text-white py-3 px-4 rounded-md font-medium hover:from-emerald-600 hover:to-cyan-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
          >
            {loading ? 'Matching...' : 'Find Perfect Match'}
          </button>
        </form>
      )}
    </div>
  );
};

export default PGSearchForm;