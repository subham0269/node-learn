import express from 'express';
import { handleUserLogin, handleUserSignup } from '../controllers/user.js';

const router = express.Router();

router.route('/').post(handleUserSignup)

router.route('/login').post(handleUserLogin)

export default router;