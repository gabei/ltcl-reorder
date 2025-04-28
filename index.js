import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import {storage, fileFilterOptions} from './storage/storage.js';


const port = 3000;
const app = express();


app.use(cors());
app.use(helmet());
app.use(express.static('public'));


const upload = multer({ 
  storage: storage,
  //fileFilter: fileFilterOptions,
});


app.get('/', async (req, res, next) => {
  res.status(200).send('Welcome!');
});


app.post('/reorder', upload.array('file-select', 5), async (req, res, next) => {
  if(req.file){
    res.status(200).send({response: 'File received.'});
  }
  console.log("/reorder hit");
  console.log(req.file);
  console.log(req.body);
  
});


app.listen(port, (err)=> {
  if(err){
    console.log(err);
  }
  console.log(`App listening on port ${port}`);
})

