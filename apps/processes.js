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


export default async function initializeReorderScript(numberOfFiles){
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

    checkIfFilesWereConvertedSuccessfully(numberOfFiles).then((result) => {
      if(result === true) { 
        processCompletedSuccessfully = true; 
      } else {
        console.log("There was an error while confirming file output: " + result);
        console.log(result)
        return(new Error("There was an error while confirming file output."));
      }
    })
  });

  return processCompletedSuccessfully;
}

async function checkIfFilesWereConvertedSuccessfully(expectedNumberOfFiles){
  const pathToOutputDir = path.join(__dirname, './reorder-app/output/');
  const fileError = new Error("There was an error while reading the output directory.");

  if( expectedNumberOfFiles === undefined || 
      expectedNumberOfFiles === null ||
      expectedNumberOfFiles === 0) {
        console.log("expectedNumberOfFiles is not valid.");
        return fileError
  } 

  const actualNumberOfFiles = fs.readdir(pathToOutputDir, (err, files) => {
    console.log("Checking if files were converted successfully...");
    if(err) { return fileError }
    return files.length 
  })

  return actualNumberOfFiles === expectedNumberOfFiles;
}