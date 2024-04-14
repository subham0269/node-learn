import path from 'path';
import e from "express";
import cors from 'cors';
import connectToMongo from "./connection.js";
import dotenv from 'dotenv';
import router from "./routes/index.js";
import staticRouter from './routes/static.js'
import userRouter from './routes/user.js';
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

app.use('/', staticRouter); //for ssr and pages

app.use('/user', userRouter); //for authentication

// app.use('/url', router);

app.use('/url',router) //making requests and redirects


app.listen(PORT, () => console.log(`Server started at port ${PORT}`))