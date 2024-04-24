import express from 'express';
import urlModel from '../models/url.js';

const router = express.Router();

router.route('/').get(async (req,res) => {
  const user = req.user;
  if (!user) return res.redirect('/login');
  try {
    const allUrls = await urlModel.find({ createdBy: req.user._id })
    return res.render('home', {
      urls: allUrls
    });
  } catch (err) {
    return res.status(500).json({error : 'Internal Server Error'})
  }
})

router.route('/signup').get((req,res) => {
  return res.render('signup');
})

router.route('/login').get((req,res) => {
  return res.render('login');
})

export default router;