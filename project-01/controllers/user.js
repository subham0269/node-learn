import UserModel from "../models/user.js";

export const GETallUsers = async (req,res) => {
  try {
    const allUsers = await UserModel.find({});
    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

export const GETuserById = async (req,res) => {
  try {
    const userID = req.params.id;

    if (!userID) {
      return res.status(400).json({ error: 'Missing ID parameter' });
    }
    const user = await UserModel.findById(userID);
    if (!user) {
      return res.status(404).json({error: 'User Not Found'});
    }
    return res.status(200).json({user: user})
  } catch (err) {
    return res.status(500).json({error: 'Internal Server Error'})
  }
};

export const PATCHuserById = async (req, res) => {
  try {
    const userID = req.params.id;
    const body = req.body;
    const result = await UserModel.findByIdAndUpdate(userID, body);
    if (!result) return res.status(404).json({error: 'User Not found'});
    return res.status(200).json({status: 'Updated user successfully'});
  } catch (err) {
    console.error('Error in PATCH /:id', err);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

export const DELETEuserById = async (req,res) => {
  try {
    const userID = req.params.id;
    if (!userID) {
      return res.status(404).json({ error: 'User not found' });
    }
    const result = await UserModel.findByIdAndDelete(userID);
    if(!result) return res.status(404).json({error: 'User Not found'});
    return res.status(200).json({ status: 'Removed user from json' , res: result});
  } catch (err) {
    console.error('Error in DELETE /:id', err);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};

export const POSTnewUser = async (req,res) => {
  try {
    const body = req.body;

    if (!body || !body.first_name || !body.last_name || !body.email || !body.country) {
      return res.status(400).json({message: 'All fields are required.'});
    }
    
    const result = await UserModel.create({
      firstName: body.first_name,
      lastName: body.last_name,
      email: body.email,
      country: body.country
    })
    
    // console.log("Post result: ",result);
    return res.status(201).json({status: 'User successfully created', user_id: result._id});
  } catch (err) {
    console.error('Error in POST /api/users', err);
    return res.status(500).json({error: 'Internal Server Error'});
  }
};