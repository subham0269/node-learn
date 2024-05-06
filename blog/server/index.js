import express from "express";
import connectToMongo from "./connection.js";
import router from "./routes/user.js";
import dotenv from 'dotenv';
dotenv.config();

const PORT = 8000;
const app = express();

const { MONGO_URL } = process.env;

// app.use(cors())

connectToMongo(MONGO_URL).then(() => console.log('Connected to Database')).catch((err) => {
  console.log('Error in Database', err);
})

app.use(express.urlencoded({extended: false}));

app.use('/', router);

app.listen(PORT, () => console.log(`Server started at port ${8000}`));