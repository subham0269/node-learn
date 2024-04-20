import userModel from "../models/users.js";
import { v4 as uuidv4 } from 'uuid';
import { getUser, setUser } from "../service/auth.js";
// uuidv4();

export const handleUserSignup = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    console.log(req.body);
    const usr = await userModel.create({
      name, email, password
    })
    if (!usr) {
      return res.status(400).json({Error: 'Failed to create new user'})
    }
    return res.redirect('/')
  } catch (err) {
    console.log('Error while signup : ', err);
    return res.status(500).json({error:'Internal Server Error'})
  }
}

export const handleUserLogin = async (req, res) => {
  try {
    const {email, password} = req.body;
    const usr = await userModel.findOne({email, password})
    if (!usr) return res.render('login', {
      error: 'Invalid email or password'
    })
    const jwtToken = setUser(usr);
    res.cookie('uid', jwtToken);
    return res.redirect('/')
  } catch (err) {
    console.log('user login error', err);
    return res.status(500).json({error : 'Internal Server Error'})
  }
}