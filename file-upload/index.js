import path from 'path';
import express from 'express';
import multer from 'multer';

const app = express();
const PORT = 8000;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function(req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, `${uniquePrefix}-${file.originalname}`);
  }
})

const upload = multer({storage});

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.urlencoded({extended: false}));

app.get('/', (req, res) => {
  return res.render("homepage")
});

app.post('/upload', upload.single('profileImage'), (req, res) => {
  console.log(req.file, req.body);
  return res.send({message: 'hello from upload route'})
})


app.listen(PORT, () => console.log(`Server started at port ${PORT}`));