import { loadPGsByArea, loadAllPGs } from '../utils/loadPgData.js';
import { matchAllPGs } from '../utils/matcher.js';

export const getPGsByArea = (req, res) => {
  try {
    const { area } = req.params;
    const rawPGs = loadPGsByArea(area);

    if (!rawPGs.length) {
      return res.status(404).json({
        success: false,
        msg: 'No PGs found in this area'
      });
    }

    const cleanedPGs = rawPGs.map(pg => ({
      matchScore: pg.matchScore,
      pg_id: pg.pg_id,
      title: pg.title,
      price: pg.price,
      location: pg.location,
      gender: pg.gender,
      nearby: pg.nearby,
      ac_rooms: pg.ac_rooms,
      landmarks: pg.landmarks,
      description: pg.description,
      photos: pg.all_photos
    }));

    return res.status(200).json({
      success: true,
      msg: `${cleanedPGs.length} PGs found in ${area}`,
      data: {
        total: cleanedPGs.length,
        results: cleanedPGs
      }
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};

export const getPGById = (req, res) => {
  try {
    const { pg_id } = req.params;
    const allData = loadAllPGs();
    const pg = allData.find(p => p.pg_id === pg_id);

    if (!pg) {
      return res.status(404).json({
        success: false,
        msg: 'PG not found',
      });
    }

    const pgData = {
      title: pg.title,
      price: pg.price,
      location: pg.location,
      gender: pg.gender,
      room_details: pg.room_details,
      nearby: pg.nearby,
      description: pg.description,
      landmarks: pg.landmarks,
      owner_name: pg.owner_name,
      owner_type: pg.owner_type,
      owner_phone: pg.owner_phone,
      pg_for: pg.pg_for,
      min_price: pg.min_price,
      max_price: pg.max_price,
      pg_locality: pg.pg_locality,
      full_address: pg.full_address,
      deposit_amount: pg.deposit_amount,
      maintenance_charges: pg.maintenance_charges,
      notice_period: pg.notice_period,
      electricity_charges: pg.electricity_charges,
      ac_rooms: pg.ac_rooms,
      parking_details: pg.parking_details,
      power_backup: pg.power_backup,
      total_beds: pg.total_beds,
      operating_since: pg.operating_since,
      common_amenities: pg.common_amenities,
      food_details: pg.food_details,
      house_rules: pg.house_rules,
      gate_timing: pg.gate_timing,
      coordinates: pg.coordinates,
      nearby_landmarks_by_category: pg.nearby_landmarks_by_category,
    };

    return res.status(200).json({
      success: true,
      msg: 'PG found',
      data: pgData
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: error.message
    });
  }
};

export const matchPGs = (req, res) => {
  try {
    const preferences = req.body;
    const allData = loadAllPGs();
    const matched = matchAllPGs(allData, preferences);

    const THRESHOLD = 50;
    const highScorePGs = matched.filter(pg => pg.matchScore >= THRESHOLD);
    const sortedPGs = highScorePGs.sort((a, b) => b.matchScore - a.matchScore);

    const cleanedPGs = sortedPGs.map(pg => ({
      matchScore: pg.matchScore,
      pg_id: pg.pg_id,
      title: pg.title,
      price: pg.price,
      location: pg.location,
      gender: pg.gender,
      nearby: pg.nearby,
      ac_rooms: pg.ac_rooms,
      landmarks: pg.landmarks,
      description: pg.description,
      photos: pg.all_photos,
    }));

    return res.status(200).json({
      success: true,
      msg: "PGs matched successfully",
      data: {
        total: cleanedPGs.length,
        results: cleanedPGs,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      msg: "Failed to match PGs: " + error.message,
    });
  }
};

