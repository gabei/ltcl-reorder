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
  let processCompletedSuccessfully = false;

  spawnReorder.on("spawn", () => {
    console.log("Reorder script started.");
  });

  spawnReorder.on("error", (err) => {
    return(new Error("There was an error while running the reorder script: " + err.message));
  })

  spawnReorder.on("close", (code) => {
    console.log("Reorder script process closed with code " + code);

    checkIfFilesWereConvertedSuccessfully().then((result) => {
      if(result === true) { 
        console.log("Files were converted successfully.");
        processCompletedSuccessfully = true; 
      } else {
        return(new Error("There was an error while confirming file output: " + result));
      }
    })
  });

  return processCompletedSuccessfully;
}

async function checkIfFilesWereConvertedSuccessfully(retries=1){
  const pathToInputDir = path.join(__dirname, './reorder-app/input');
  const pathToOutputDir = path.join(__dirname, './reorder-app/output');

  const numberOfInputFiles = await readNumberOfFilesFromDir(pathToInputDir);
  const numberOfOutputFiles = await readNumberOfFilesFromDir(pathToOutputDir);

  
  // if( expectedNumberOfFiles === undefined || 
  //     expectedNumberOfFiles === null ||
  //     expectedNumberOfFiles === 0) {

  //       if(retries <= 3) {
  //         console.log("Retrying to check if files were converted successfully: " + retries + "...");

  //         setTimeout(() => {
  //           return checkIfFilesWereConvertedSuccessfully(expectedNumberOfFiles, retries + 1);
  //         }, 1000 * retries);

  //       }

  //       return new Error("Expected Number Of Files is not valid.");
  // } 

  return numberOfInputFiles === numberOfOutputFiles;
}


async function readNumberOfFilesFromDir(directoryPath) {
  return new Promise((resolve, reject) => {
    const pathToInputDir = path.join(__dirname, directoryPath);
    fs.readdir(pathToInputDir, (err, files) => {
      if(err) { 
        reject(new Error("There was an error while checking the input directoy: " + err.message)); 
      }
      resolve(files.length);
    });
  });

}