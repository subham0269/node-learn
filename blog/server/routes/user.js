import { Router } from 'express';
import userModel from '../models/User.js';
import { setUser } from '../services/auth.js';
const router = Router();

router.route('/signup').post(async (req,res) => {
  const { fullName, email, password } = req.body;
  try {
    const user = await userModel.create({
      fullName,
      email,
      password
    })
    console.log(user);
    return res.status(201).send({message: 'Succesfully created user'});
  } catch (err) {
    console.log(err);
    return res.status(500).send({Error : 'Internal Server Error', message: err})
  }
})

router.route('/signin').post( async (req, res) => {
  const { email, password } = req.body;
  console.log('user object', req.user);
  try {
    const user = await userModel.passwordMatchChecker(email, password);
    console.log(user);
    const JWTtoken = setUser(user);
    res.cookie('token', JWTtoken);
    return res.status(200).send({ message: 'Succesfully signed in!!!' });
  } catch (err) {
    console.log(err);
    return res.status(500).send({Error : 'Internal Server Error', message: err})
  }
})

export default router;