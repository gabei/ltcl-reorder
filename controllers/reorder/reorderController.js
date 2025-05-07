import multer from 'multer';
import {storage, fileFilterOptions, cleanupFiles} from '../../storage/storage.js';
import initializeReorderScript from '../../apps/processes.js';


const upload = multer({ 
  storage: storage,
  fileFilter: fileFilterOptions,
});


const uploadImageArray = upload.array('file-select', 5);


async function handleReorder(request, response, next){
  let errors = [];

  uploadImageArray(request, response, (err)=> {
    if(err){ errors.push(err) } 
  })

  let result = await initializeReorderScript();
  if(result instanceof Error) {
    errors.push(result.message);
  }
  

  if(errors.length > 0){
    let errorMessages = "There were errors while running the reorder script: " + errors.join(",\n");
    errors.forEach((error) => {
      console.trace(error)
    });
    
    return response.status(400).send({
      message: errorMessages
    }); 
  } else {

    const downloadPath = 'apps/reorder-app/output/output-1.csv';
    response.status(200).download(downloadPath, (err) => {
      if (err) {
        console.error("Error downloading the file:", err);
        return response.status(500).send({
          message: "There was an error while downloading the file.",
        });
      } else {
        try {
          cleanupFiles(downloadPath);
        } catch(err) {
          console.trace(err);
        }
      }
    })
    
  }
}

export default handleReorder
  