import React from 'react';
import { useNavigate } from 'react-router-dom';

const PGCard = ({ pg }) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/pg/${pg.pg_id}`);
  };

  const getMatchScoreColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getTopFeatures = (pg) => {
    const features = [];
    if (pg.ac_rooms === 'Available') features.push('AC Room');
    if (pg.location) features.push(pg.location);
    if (pg.nearby) features.push(`Near ${pg.nearby}`);
    return features.slice(0, 3);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 bg-gray-200">
        {pg.photos && pg.photos.length > 0 ? (
          <img 
            src={pg.photos[0]} 
            alt={pg.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-r from-gray-100 to-gray-200">
            <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-2M5 21h2m0 0h2m-2 0v-4a2 2 0 012-2h2a2 2 0 012 2v4m-6 0V9a2 2 0 012-2h2a2 2 0 012 2v4" />
            </svg>
          </div>
        )}
        
        {/* Match Score Badge */}
        {pg.matchScore && (
          <div className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-bold ${getMatchScoreColor(pg.matchScore)}`}>
            {Math.round(pg.matchScore)}% Match
          </div>
        )}
        
        {/* Gender Badge */}
        <div className="absolute top-3 left-3 px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-medium">
          {pg.gender || 'Coed'}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">{pg.title}</h3>
        
        <div className="flex items-center justify-between mb-3">
          <span className="text-xl font-bold text-emerald-600">{pg.price}</span>
          <span className="text-sm text-gray-600">{pg.location}</span>
        </div>

        {/* Match Reasons or Top Features */}
        <div className="mb-3">
          {pg.matchReasons && pg.matchReasons.length > 0 ? (
            <>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Why it matches:</h4>
              <div className="flex flex-wrap gap-1">
                {pg.matchReasons.map((reason, index) => (
                  <span key={index} className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded text-xs">
                    {reason}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Top Features:</h4>
              <div className="flex flex-wrap gap-1">
                {getTopFeatures(pg).map((feature, index) => (
                  <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                    {feature}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Description */}
        {pg.description && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {pg.description}
          </p>
        )}

        {/* Landmarks */}
        {pg.landmarks && pg.landmarks.length > 0 && (
          <div className="mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              {pg.landmarks[0]}
            </div>
          </div>
        )}

        {/* View Details Button */}
        <button
          onClick={handleViewDetails}
          className="w-full px-4 py-2 bg-gradient-to-r from-emerald-500 to-cyan-500 text-white rounded-lg font-medium hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PGCard;