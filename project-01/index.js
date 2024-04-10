import { promises as fs } from 'fs';
import path from 'path';
import express from 'express';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 8000;
const { MONGODB_URL } = process.env;

app.use(cors());

mongoose.connect(MONGODB_URL)
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.log('Error in mongo', err);
})
const userSchema = new mongoose.Schema ({
  firstName: {
    type: String,
    required: true
  },
  lastName:{
    type:String,
    required: true
  },
  email:{
    type: String,
    unique: true,
    required: true
  },
  country: {
    type: String,
  }
}, {timestamps: true});

const UserModel = new mongoose.model("user", userSchema);

// --------------------

// Middleware
app.use(express.urlencoded({extended: false}))

app.use(async (req,res, next) => {
  try {
    await fs.appendFile('log.txt', `${Date.now()}: ${req.ip} ${req.method}: ${req.path}\n`);
    // console.log('hello 1st middleware');
  } catch (err) {
    console.error('Error in first middleware', err);
    return res.status(500).json({error: 'Internal Server Error'});
  } finally {
    next();
  }
})


// Just for testing SSR and returing HTML
app.get('/users', async (req, res) => {
  try {
    const usersData = await UserModel.find({});
    const html = `
    <ul>
      ${usersData.map(user => `<li key=${user.id}>${user.firstName} ${user.lastName} - ${user.email}</li>`).join('')}
    </ul>
    `
    return res.status(200).send(html);
  } catch(err) {
    return res.status(500).json({error: "Internal Server Error"});
  }
})
// ---------------------------------------


app.get('/api/users', async (req,res) => {
  try {
    const allUsers = await UserModel.find({});
    return res.status(200).json(allUsers);
  } catch (err) {
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

app.route('/api/users/:id')
  .get(async (req,res) => {
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
  })
  .patch(async (req, res) => {
    try {
      const userID = req.params.id;
      const body = req.body;
      const result = await UserModel.findByIdAndUpdate(userID, body);
      if (!result) return res.status(404).json({error: 'User Not found'});
      return res.status(200).json({status: 'Updated user successfully', result: result});
    } catch (err) {
      console.error('Error in PATCH /api/users/:id', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  })
  .delete(async (req,res) => {
    try {
      const userID = req.params.id;
      if (!userID) {
        return res.status(404).json({ error: 'User not found' });
      }
      const result = await UserModel.findByIdAndDelete(userID);
      if(!result) return res.status(404).json({error: 'User Not found'});
      return res.status(200).json({ status: 'Removed user from json' , res: result});
    } catch (err) {
      console.error('Error in DELETE /api/users/:id', err);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  })

app.post('/api/users', async (req,res) => {
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
    
    console.log("Post result: ",result);
    return res.status(201).json({status: 'User successfully created'});
  } catch (err) {
    console.error('Error in POST /api/users', err);
    return res.status(500).json({error: 'Internal Server Error'});
  }
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))