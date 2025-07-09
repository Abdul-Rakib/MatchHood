const calculateDistanceScore = (landmarkStr) => {
  // Extract distance from strings like "0.2 Km from Gnan Srishti School Of Excellence"
  const distanceMatch = landmarkStr.match(/(\d+\.?\d*)\s*km/i);
  if (!distanceMatch) return 0;
  
  const distance = parseFloat(distanceMatch[1]);
  if (isNaN(distance)) return 0;
  
  // Scoring based on distance
  if (distance <= 0.5) return 25;
  if (distance <= 1) return 20;
  if (distance <= 2) return 15;
  if (distance <= 3) return 10;
  if (distance <= 5) return 5;
  return 0;
};

const matchPG = (pg, preferences) => {
  let score = 0;
  const maxScore = 100; // For percentage calculation

  const {
    budgetMin = 0,
    budgetMax = Infinity,
    gender = '',
    foodPreference = '',
    amenities = [],
    preferredLocation = '',
  } = preferences;

  // Budget matching (30% weight)
  const price = parseInt(pg.min_price) || 0;
  if (price >= budgetMin && price <= budgetMax) {
    score += 30;
  } else {
    // Partial score for nearby budget
    const budgetRange = budgetMax - budgetMin;
    const priceDeviation = Math.min(Math.abs(price - budgetMin), Math.abs(price - budgetMax));
    const tolerancePercent = 0.2; // 20% tolerance
    const tolerance = budgetRange * tolerancePercent;
    
    if (priceDeviation <= tolerance) {
      score += 15; // Half score for close matches
    }
  }

  // Gender matching (20% weight)
  if (gender && pg.gender) {
    const pgGender = pg.gender.toLowerCase();
    const prefGender = gender.toLowerCase();
    
    if (pgGender === 'coed' || prefGender === 'coed') {
      score += 20; // Coed matches everyone
    } else if (pgGender.includes(prefGender) || prefGender.includes(pgGender)) {
      score += 20;
    } else if (pgGender.includes('boys') && prefGender.includes('boys')) {
      score += 20;
    } else if (pgGender.includes('girls') && prefGender.includes('girls')) {
      score += 20;
    }
  }

  // Food preference matching (15% weight)
  if (foodPreference && pg.food_details?.["Meals provided"]) {
    const food = pg.food_details["Meals provided"].toLowerCase();
    const prefFood = foodPreference.toLowerCase();
    
    if (prefFood === 'both' || food.includes('both') || food.includes('veg & non-veg')) {
      score += 15;
    } else if (prefFood === 'veg' && (food.includes('veg') || food.includes('vegetarian'))) {
      score += 15;
    } else if (prefFood === 'non-veg' && (food.includes('non-veg') || food.includes('non-vegetarian'))) {
      score += 15;
    }
  }

  // Amenities matching (20% weight)
  if (amenities.length > 0 && pg.common_amenities) {
    let amenityScore = 0;
    const totalAmenities = amenities.length;
    
    // High priority amenities get more weight
    const amenityWeights = {
      'wifi': 4,
      'ac': 4,
      'food': 3,
      'parking': 3,
      'power backup': 3,
      'gym': 2,
      'laundry': 2,
      'tv': 1
    };
    
    amenities.forEach((amenity) => {
      const amenityLower = amenity.toLowerCase();
      const found = pg.common_amenities.some(am => 
        am.toLowerCase().includes(amenityLower) || 
        amenityLower.includes(am.toLowerCase())
      );
      
      if (found) {
        const weight = amenityWeights[amenityLower] || 2;
        amenityScore += weight;
      }
    });
    
    // Normalize amenity score to max 20
    const maxAmenityScore = Math.max(...Object.values(amenityWeights)) * totalAmenities;
    amenityScore = Math.min(20, (amenityScore / maxAmenityScore) * 20);
    score += amenityScore;
  }

  // AC availability bonus (5% weight)
  if (pg.ac_rooms?.toLowerCase() === 'available') {
    score += 5;
  }

  // Owner type preference (5% weight)
  if (pg.owner_type?.toLowerCase() === 'owner') {
    score += 5;
  }

  // Location/distance matching (5% weight)
  if (preferredLocation && pg.landmarks) {
    const locationScore = pg.landmarks.reduce((maxScore, landmark) => {
      const landmarkLower = landmark.toLowerCase();
      const prefLocationLower = preferredLocation.toLowerCase();
      
      // Check if landmark mentions the preferred location
      if (landmarkLower.includes(prefLocationLower)) {
        return Math.max(maxScore, calculateDistanceScore(landmark));
      }
      return maxScore;
    }, 0);
    
    // Normalize to max 5 points
    score += Math.min(5, locationScore / 5);
  }

  return Math.min(100, Math.round(score));
};

const getMatchingReasons = (pg, preferences) => {
  const reasons = [];
  
  const {
    budgetMin = 0,
    budgetMax = Infinity,
    gender = '',
    foodPreference = '',
    amenities = [],
    preferredLocation = '',
  } = preferences;

  // Budget matching
  const price = parseInt(pg.min_price) || 0;
  if (price >= budgetMin && price <= budgetMax) {
    reasons.push(`Within budget (₹${price.toLocaleString()})`);
  }

  // Gender matching
  if (gender && pg.gender) {
    const pgGender = pg.gender.toLowerCase();
    const prefGender = gender.toLowerCase();
    
    if (pgGender === 'coed' || prefGender === 'coed') {
      reasons.push('Coed accommodation');
    } else if (pgGender.includes(prefGender)) {
      reasons.push(`${gender} accommodation`);
    }
  }

  // Food matching
  if (foodPreference && pg.food_details?.["Meals provided"]) {
    const food = pg.food_details["Meals provided"].toLowerCase();
    const prefFood = foodPreference.toLowerCase();
    
    if (prefFood === 'both' || food.includes('both') || food.includes('veg & non-veg')) {
      reasons.push('Both veg & non-veg meals');
    } else if (prefFood === 'veg' && food.includes('veg')) {
      reasons.push('Vegetarian meals');
    } else if (prefFood === 'non-veg' && food.includes('non-veg')) {
      reasons.push('Non-vegetarian meals');
    }
  }

  // Amenities matching
  if (amenities.length > 0 && pg.common_amenities) {
    const matchedAmenities = amenities.filter(amenity => 
      pg.common_amenities.some(am => 
        am.toLowerCase().includes(amenity.toLowerCase()) || 
        amenity.toLowerCase().includes(am.toLowerCase())
      )
    );
    
    if (matchedAmenities.length > 0) {
      reasons.push(`Has ${matchedAmenities.slice(0, 3).join(', ')}`);
    }
  }

  // AC availability
  if (pg.ac_rooms?.toLowerCase() === 'available') {
    reasons.push('AC available');
  }

  // Owner type
  if (pg.owner_type?.toLowerCase() === 'owner') {
    reasons.push('Owner managed');
  }

  // Location proximity
  if (preferredLocation && pg.landmarks) {
    const nearbyLandmarks = pg.landmarks.filter(landmark => 
      landmark.toLowerCase().includes(preferredLocation.toLowerCase())
    );
    
    if (nearbyLandmarks.length > 0) {
      reasons.push(`Near ${preferredLocation}`);
    }
  }

  return reasons.slice(0, 3); // Return top 3 reasons
};

export const matchAllPGs = (pgList, preferences) => {
  return pgList
    .map(pg => ({
      ...pg,
      matchScore: matchPG(pg, preferences),
      matchReasons: getMatchingReasons(pg, preferences)
    }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

