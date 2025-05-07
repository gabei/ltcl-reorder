import multer from 'multer';
import {storage, fileFilterOptions} from '../../storage/storage.js';
import initializeReorderScript from '../../apps/processes.js';


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilterOptions,
});


const uploadImageArray = upload.array('file-select', 5);


async function handleReorder(request, response, next){
  console.log("files uploaded!");

  let errors = [];

  uploadImageArray(request, response, (err)=> {
    if(err){ errors.push(err) } 
  })

  await initializeReorderScript()
    .then((result) => console.log("awaiting init reorder script from controller. Result = " + result))
    .catch((err) => {
      errors.push(err);
  });

  if(errors.length > 0){
    let errorMessages = "There were errors while running the reorder script: " + errors.join(",\n");

    errors.forEach((error) => {
      console.trace(error)
    });
    
    return response.status(400).send({
      message: errorMessages
    }); 
  } else {
    console.log("Reorder script ran successfully.");
    return response.status(200).send({
      message: "Your files were uploaded successfully.",
    });
  }
}

export default handleReorder
  