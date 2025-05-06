import multer from 'multer';
import {storage, fileFilterOptions} from '../../storage/storage.js';
import initializeReorderScript from '../../apps/processes.js';


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilterOptions,
});


const uploadImageArray = upload.array('file-select', 5);


async function handleReorder(req, res, next){
  console.log("files uploaded!");


  let errors = [];
  let filesLength = 0;


  uploadImageArray(req, res, (err)=> {
    filesLength = req.files.length;
    if(err){ errors.push(err) } 
  })


  await initializeReorderScript(filesLength).catch((err) => {
    errors.push(err);
  });


  if(errors.length > 0){
    let errorMessages = "There were errors while running the reorder script: " + errors.join(",\n");
    
    console.log(errorMessages);
    return res.status(400).send({
      message: errorMessages
    }); 
  } else {
    console.log("Reorder script ran successfully.");
    return res.status(200).send({
      message: "Your files were uploaded successfully.",
    });
  }

  
}

export default handleReorder
  