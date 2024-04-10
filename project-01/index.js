import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
// import UserModel from './models/user.js';

import routes from './routes/user.js';
import connectToDB from './connection.js';
import logReqRes from './middlewares/index.js';

const app = express();
const PORT = 8000;
const { MONGODB_URL } = process.env;

app.use(cors());

// Connection
connectToDB(MONGODB_URL)
.then(() => {
  console.log("MongoDB connected");
})
.catch((err) => {
  console.log('Error in mongo', err);
})
// --------------------

// Middleware
app.use(express.urlencoded({extended: false}))

app.use(logReqRes('log.txt'))
// ----------

// Routes
app.use('/api/users', routes);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`))