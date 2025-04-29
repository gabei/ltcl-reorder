
// multer is used for file uploads and temp storage
// whichever storage works for python to work on them temporarily
// below is the default setup for diskStorage provided by 
// multer documentation
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