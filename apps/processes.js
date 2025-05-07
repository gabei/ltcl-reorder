import { exec } from "child_process";
import path from "path";
import fs from "fs";


const __dirname = import.meta.dirname;
const scriptDirectory = path.join(__dirname, './reorder-app');
const scriptCommand = "python reorder.py";


const spawnOptions = {
  cwd: scriptDirectory,
  timeout: 5000,
  windowsHide: true,

}


export default async function initializeReorderScript(){
  const spawnReorder = exec(scriptCommand, spawnOptions);

  spawnReorder.on("spawn", () => {
    console.log("Reorder script started.");
  });

  spawnReorder.on("error", (err) => {
    return(new Error("There was an error while running the reorder script: " + err.message));
  })

  spawnReorder.on("close", (code) => {
    console.log("Reorder script finished with code: " + code);

    return new Promise((resolve, reject) => {
      checkIfFilesWereConvertedSuccessfully().then((result) => {  
        // result is currently returning undefined
        if(result) {
          resolve(result);
        } else {
          reject(new Error("There was an error while returning a promise from the reorder script."));
        }
      })
    })
  });
};

  

async function checkIfFilesWereConvertedSuccessfully(retries=1){
  let pathToInputDir = path.join(__dirname, './reorder-app/input');
  let pathToOutputDir = path.join(__dirname, './reorder-app/output');

  let numberOfInputFiles = await readNumberOfFilesFromDir(pathToInputDir);
  let numberOfOutputFiles = await readNumberOfFilesFromDir(pathToOutputDir);

  // if(!numberOfInputFiles || !numberOfOutputFiles) {
  //   console.log("There are no files in the input or output directory. Trying again: " + retries + " of 3");
  //   if(retries < 3){
  //     setTimeout(checkIfFilesWereConvertedSuccessfully, 1000 * retries, retries+1);
  //   }
  // } else {
  //   return numberOfInputFiles === numberOfOutputFiles;
  // }


  return numberOfInputFiles === numberOfOutputFiles;
}


async function readNumberOfFilesFromDir(directoryPath) {
  if(!fs.existsSync(directoryPath)) {
    return new Error("The directory does not exist: " + directoryPath);
  }

  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if(err) { 
        reject(new Error("There was an error while checking directory: " + directoryPath + "\n" + err.message)); 
      }
      resolve(files.length);
    });
  });

}