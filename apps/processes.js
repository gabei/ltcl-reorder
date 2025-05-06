import { spawn } from "child_process";
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

  spawnReorder.on("spawn", () => {
    console.log("Reorder script started.");
  });

  spawnReorder.on("error", (err) => {
    return(new Error("There was an error while running the reorder script: " + err.message));
  })

  spawnReorder.stdout.on("data", (data) => {
    console.log("Reorder script complete. Data saved to output directory.");
  })

  spawnReorder.on("close", (code) => {
    console.log("Process closed with code " + code);
  })

  let filesWereSuccessfullyConverted = await checkIfFilesWereConvertedSuccessfully(numberOfFiles);
  return filesWereSuccessfullyConverted;
}


async function checkIfFilesWereConvertedSuccessfully(expectedNumberOfFiles){
  const fileError = new Error("There was an error while reading the output directory.");

  if( expectedNumberOfFiles === undefined || 
      expectedNumberOfFiles === null ||
      expectedNumberOfFiles === 0) {
        return fileError
  }

  const pathToOutputDir = "./reorder-app/output/";
  const actualNumberOfFiles = fs.readdir(pathToOutputDir, (err, files) => {
    if(err) { return fileError }
    return files.length 
  })

  return actualNumberOfFiles === expectedNumberOfFiles;
}