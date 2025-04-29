/* Multer middleware is used for file uploads and storage in Express.
   - Below is the default setup for diskStorage provided by Multer's documentation
   - Files will be stored to the disk temporarily while a python script works on them
   - Files should be removed afterward
   - View the docs here: https://github.com/expressjs/multer
*/


import multer from "multer";


const storage = multer.diskStorage({
  destination: 'src/input',
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + ".csv";
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})


function fileFilterOptions(req, file, cb) {
  if(file.mimetype === "text/csv" || file.type === "text/csv"){
    cb(null, true);
  } else {
    cb(new Error('Invalid file type'));
  }
}


export { storage, fileFilterOptions };