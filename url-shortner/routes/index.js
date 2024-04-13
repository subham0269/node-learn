import { generateNewShortURL, getAllUrl, redirectToUrl } from "../controllers/url.js";
import express from 'express';

const router = express.Router();

router.route('/')
  .post(generateNewShortURL)
  .get(getAllUrl)
router.route('/:id').get(redirectToUrl)

export default router;