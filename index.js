import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';


const port = 3000;
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.static('public'));


// multer is used for file uploads and temp storage
// whichever storage works for python to work on them temporarily
const storage = multer.diskStorage({
  destination: function(req, file cb) {
    cb();
  },
  filename: function(req, file, cb) {
    const suffix = "input-" + Date.now() + "-" + Math.random() * 1E9;
    cb(null, file.fieldname + "-" + suffix);
  }
})

const upload = multer({ storage: storage});


app.get('/', async (req, res, next) => {
  res.status(200).send('Welcome!');
});

app.post('/reorder', upload.single('file-select'), async (req, res, next) => {
  console.log(req.file);
  console.log(req.body);
  
});


app.listen(port, (err)=> {
  if(err){
    console.log(err);
  }
  console.log(`App listening on port ${port}`);
})

