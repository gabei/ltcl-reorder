import multer from 'multer';
import {storage, fileFilterOptions} from '../../storage/storage.js';


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilterOptions,
});


const uploadImageArray = upload.array('file-select', 5);


export default async function handleReorder(req, res, next){
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
}
  