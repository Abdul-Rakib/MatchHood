import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PGSearchForm from '../../components/pg/PGSearchForm';
import PGResultsList from '../../components/pg/PGResultsList';
import usePGSearch from '../../../hooks/usePGSearch';

const SearchPage = () => {
  const location = useLocation();
  const { searchByArea, matchPGs, loading, error, results, searchQuery } = usePGSearch();

  // Handle search from URL params or homepage navigation
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const area = params.get('area');
    if (area) {
      searchByArea(area);
    }
  }, [location.search]);

  const handleAreaSearch = (area) => {
    searchByArea(area);
  };

  const handleMatchPreferences = (preferences) => {
    matchPGs(preferences);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Find Your Perfect <span className="text-emerald-600">PG</span>
          </h1>
          <p className="text-xl text-gray-600">
            Discover PGs that match your lifestyle and preferences
          </p>
        </div>

        {/* Search Form */}
        <PGSearchForm
          onSearch={handleAreaSearch}
          onMatchPreferences={handleMatchPreferences}
          loading={loading}
        />

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