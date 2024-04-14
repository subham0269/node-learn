import express from 'express';

const router = express.Router();

router.route('/').get((req,res) => {
  return res.render('home');
})

router.route('/signup').get((req,res) => {
  return res.render('signup');
})

export default router;