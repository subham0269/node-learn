import userModel from "../models/users.js"

export const handleUserSignup = async (req, res) => {
  // Add authentiation
  const {name, email, password} = req.body;
  await userModel.create({
    name, email, password
  })
  return res.render('home')
}