import React from 'react';
import PGCard from './PGCard';

const PGResultsList = ({ results, loading, error, searchQuery }) => {
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
        <p className="mt-4 text-gray-600">Searching for perfect PGs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h3 className="text-lg font-medium text-red-800 mb-2">No Results Found</h3>
          <p className="text-red-600">{error}</p>
        </div>
      </div>
    );
  }

  if (!results || results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M5 21h2m0 0h2m-2 0v-4a2 2 0 012-2h2a2 2 0 012 2v4m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v4" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Start Your Search</h3>
          <p className="text-gray-600">Use the search form above to find PGs that match your preferences.</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Results Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          {searchQuery ? `PGs in ${searchQuery}` : 'Search Results'}
        </h2>
        <p className="text-gray-600">
          Found {results.length} PG{results.length !== 1 ? 's' : ''} matching your criteria
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((pg) => (
          <PGCard key={pg.pg_id} pg={pg} />
        ))}
      </div>

      {/* Load More Button (if needed in future) */}
      {results.length > 0 && (
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Showing {results.length} results
          </p>
        </div>
      )}
    </div>
  );
};

export default PGResultsList;