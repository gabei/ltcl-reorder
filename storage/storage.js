// Multer middleware is used for file uploads and storage in Express.
//   - Below is the default setup for diskStorage provided by Multer's documentation
//   - Files will be stored to the disk temporarily while a python script works on them
//   - Files should be removed afterward using multer's removeUploadedFiles function
//   - View the docs here: https://github.com/expressjs/multer



import multer from "multer";
import path from "path";
import fs from "fs"


const __dirname = import.meta.dirname;
const inputStorageDirectory = path.join(__dirname, '../apps/reorder-app/input');
const outputStorageDirectory = path.join(__dirname, '../apps/reorder-app/output');


const storage = multer.diskStorage({
  destination: inputStorageDirectory,
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ".csv";
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


function fileFilterOptions(req, file, filterCallback) {
  if(file.mimetype === "text/csv" || file.mimetype === "application/vnd.ms-excel"
   
   ){
    filterCallback(null, true);
  } else {
    filterCallback(new Error('Invalid file type:' + file.type + ' - ' + file.mimetype));
  }
}



function filterCallback(err, fileDoesPass) {
  if(err) {
    // Handle error here and return to caller can send response status
    // - status code 415: unsuppported media type
    throw err;
  }

  
    // otherwise the file passes
    // return true to caller so file manipulation can begin from there
    return fileDoesPass
}



async function cleanupFiles() {
  let errors =[];

  try {
    await deleteAllDirFiles(inputStorageDirectory);
    await deleteAllDirFiles(outputStorageDirectory);
  } catch (err) {
    errors.push(err);
  }

  if(errors.length > 0) return errors;
  return true;
}

async function deleteAllDirFiles(storageDirectory) {
  fs.readdir(storageDirectory, (err, files) => {
    if (err) {
      return new Error("Error reading directory at " + storageDirectory + ":", err);
    }

    files.forEach(file => {
      const filePath = path.join(storageDirectory, file);
      fs.unlink(filePath, (err) => {
        if (err) {
          return new Error("Error deleting file at "+ filePath + ":", err);
        } else {
          console.log("File deleted successfully:", filePath);
          return true;
        }
      });
    });
  });
}


export { storage, fileFilterOptions, filterCallback, cleanupFiles };