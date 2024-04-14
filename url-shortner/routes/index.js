import { generateNewShortURL, getAllUrl, getAnalytics, redirectToUrl } from "../controllers/url.js";
import express from 'express';

const router = express.Router();

router.route('/')
  .post(generateNewShortURL)
  .get(getAllUrl)
router.route('/:id').get(redirectToUrl)
router.route('/analytics/:id').get(getAnalytics)

export default router;