import path from 'path';
import e from "express";
import cors from 'cors';
import connectToMongo from "./connection.js";
import dotenv from 'dotenv';
import router from "./routes/index.js";
import staticRouter from './routes/static.js'
import userRouter from './routes/user.js';
import cookieParser from 'cookie-parser'
import { restrictLoggedInUserOnly, checkAuth } from './middlewares/auth.js';
dotenv.config();;
const PORT = 8001;
const app = e();

const { MONGO_URL } = process.env;

app.use(cors())

connectToMongo(MONGO_URL).then(() => console.log('Connected to Database')).catch((err) => {
  console.log('Error in Database', err);
})

app.set('view engine', 'ejs');
app.set("views",path.resolve('./views'));

app.use(e.urlencoded({extended: false}));
app.use(cookieParser());

app.use('/', checkAuth, staticRouter); //for ssr paging and routing

app.use('/user', userRouter); //for user authentication

app.use('/url',restrictLoggedInUserOnly,router) //posting new requests and redirects to the urls


app.listen(PORT, () => console.log(`Server started at port ${PORT}`))