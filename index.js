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


app.get('/', async (req, res, next) => {
  res.status(200).send('Welcome!');
});


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilterOptions,
});

const uploadImageArray = upload.array('file-select', 5);


app.post('/reorder', async (req, res, next) => {
  console.log("Files uploaded:\n" + req.files);

  uploadImageArray(req, res, (err)=> {

    if(err){
      res.status(415).send("Your files were rejected with the following error message:\n" + err.message);
    } else {
      res.status(200).send({
        message: "Your files were uploaded successfully!"
      })
    }
  })
});


app.listen(port, (err)=> {
  if(err){
    console.log(err);
  }
  console.log(`App listening on port ${port}`);
})

