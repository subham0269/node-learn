import express from 'express';

const router = express.Router();

router.route('/').get((req,res) => {
  return res.render('home');
})

router.route('/signup').get((req,res) => {
  return res.render('signup');
})

router.route('/login').get((req,res) => {
  return res.render('login');
})

export default router;