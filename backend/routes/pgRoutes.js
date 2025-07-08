import express from 'express';
import { getPGsByArea, getPGById, matchPGs } from '../controllers/pgController.js';

const router = express.Router();

router.get('/pg-by-area/:area', getPGsByArea);
router.get('/pg-by-id/:pg_id', getPGById);
router.post('/match', matchPGs);

export default router;
