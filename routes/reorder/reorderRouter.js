// multer files should go in a controller and be handled throwDeprecation. 
// This router should only work with routing logic.


import express from 'express';
import multer from 'multer';
import {storage, fileFilterOptions} from '../../storage/storage.js';


const router = express.Router();
// router.use( controller here )

const upload = multer({ 
  storage: storage,
  fileFilter: fileFilterOptions,
});


const uploadImageArray = upload.array('file-select', 5);


router.post('/', async (req, res, next) => {
  console.log("Files uploaded:\n" + req.files);

  uploadImageArray(req, res, (err)=> {

    if(err){
      res.status(415).send("Your files were rejected with the following error message:\n" + err.message);
    } else {
      // act on the csv files
      res.status(200).send({
        message: "Your files were uploaded successfully!"
      })
    }
  })
});

export default router;