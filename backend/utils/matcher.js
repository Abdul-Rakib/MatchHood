const calculateDistanceScore = (distanceStr) => {
  const distance = parseFloat(distanceStr);
  if (isNaN(distance)) return 0;
  if (distance <= 2) return 20;
  if (distance <= 5) return 10;
  return 0;
};

const matchPG = (pg, preferences) => {
  let score = 0;

  const {
    budgetMin,
    budgetMax,
    gender,
    foodPreference,
    amenities = [],
    preferredLocation,
  } = preferences;

  const price = parseInt(pg.min_price);
  if (price >= budgetMin && price <= budgetMax) score += 20;

  if (pg.gender.toLowerCase().includes(gender.toLowerCase())) score += 10;

  const food = pg.food_details?.["Meals provided"]?.toLowerCase() || '';
  if (food.includes(foodPreference.toLowerCase())) score += 10;

  amenities.forEach((a) => {
    if (pg.common_amenities?.some(am => am.toLowerCase().includes(a.toLowerCase()))) {
      score += 5;
    }
  });

  if (pg.ac_rooms?.toLowerCase() === 'available') score += 5;

  if (pg.owner_type?.toLowerCase() === 'owner') score += 5;

  const distanceScore = pg.landmarks?.reduce((maxScore, landmark) => {
    return landmark.toLowerCase().includes(preferredLocation.toLowerCase())
      ? Math.max(maxScore, calculateDistanceScore(landmark.split(" ")[0]))
      : maxScore;
  }, 0);
  score += distanceScore;

  return score;
};

export const matchAllPGs = (pgList, preferences) => {
  return pgList
    .map(pg => ({ ...pg, matchScore: matchPG(pg, preferences) }))
    .sort((a, b) => b.matchScore - a.matchScore);
};

