// Multer middleware is used for file uploads and storage in Express.
//   - Below is the default setup for diskStorage provided by Multer's documentation
//   - Files will be stored to the disk temporarily while a python script works on them
//   - Files should be removed afterward using multer's removeUploadedFiles function
//   - View the docs here: https://github.com/expressjs/multer



import multer from "multer";


const storage = multer.diskStorage({
  destination: 'src/input',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ".csv";
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


function fileFilterOptions(req, file, filterCallback) {
  if(file.mimetype === "text/csv" || file.type === "text/csv"){
    filterCallback(null, true);
  } else {
    filterCallback(new Error('Invalid file type'));
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


export { storage, fileFilterOptions, filterCallback };