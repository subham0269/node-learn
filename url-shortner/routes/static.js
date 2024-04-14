import express from 'express';

const router = express.Router();

router.route('/').get((req,res) => {
  return res.render('home');
})

export default router;