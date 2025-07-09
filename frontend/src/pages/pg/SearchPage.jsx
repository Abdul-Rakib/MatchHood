import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PGSearchForm from '../../components/pg/PGSearchForm';
import PGResultsList from '../../components/pg/PGResultsList';
import usePGSearch from '../../../hooks/usePGSearch';
import { getBackendAreaName } from '../../utils/areaMapping';

const SearchPage = () => {
  const location = useLocation();
  const { searchByArea, matchPGs, loading, error, results, searchQuery } = usePGSearch();

  // Handle search from URL params or homepage navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const area = params.get('area');
    if (area) {
      // Convert display name to backend format
      const backendAreaName = getBackendAreaName(area);
      searchByArea(backendAreaName);
    }
  }, [location.search]);

  const handleAreaSearch = (area) => {
    searchByArea(area);
  };

  const handleMatchPreferences = (preferences) => {
    matchPGs(preferences);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Enhanced Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="inline-block mb-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-2xl shadow-lg mb-4 mx-auto">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 21v-4a2 2 0 012-2h4a2 2 0 012 2v4" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Find Your Perfect{' '}
            <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">
              PG
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            Discover PGs that match your lifestyle and preferences with our smart search
          </p>
        </div>

        {/* Search Form */}
        <div className="mb-8">
          <PGSearchForm
            onSearch={handleAreaSearch}
            onMatchPreferences={handleMatchPreferences}
            loading={loading}
          />
        </div>

        {/* Results */}
        <PGResultsList
          results={results}
          loading={loading}
          error={error}
          searchQuery={searchQuery}
        />
      </div>
    </div>
  );
};

export default SearchPage;