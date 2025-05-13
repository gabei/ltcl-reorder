import { exec } from "child_process";
import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptDirectory = path.join(__dirname, './reorder-app');
const scriptCommand = "python reorder.py";


const spawnOptions = {
  cwd: scriptDirectory,
  timeout: 5000,
  windowsHide: true,
  //maxBuffer: 1024 * 1024 * 5, // 5 MB
}


export default async function initializeReorderScript(){
  return new Promise((resolve, reject) => {
    const spawnReorder = exec(scriptCommand, spawnOptions);

    spawnReorder.on("spawn", () => {
      console.log("Reorder script started.");
    });
    
    spawnReorder.stdout.on("data", (data) => {
      console.log("Reorder script output: " + data);
    }); 

    spawnReorder.on("error", (err) => {
      reject(new Error("There was an error while running the reorder script: " + err.message));
    });

    spawnReorder.on("close", async (code, signal) => {
      console.log("Reorder script closed with code: " + code);
      console.log("Reorder script closed with signal: " + signal);

      try {
        const result = await checkIfFilesWereConvertedSuccessfully();
        console.log("File check result: " + result);

        if (result) {
          resolve(result);
        } else {
          reject(new Error("There was an error while checking the files after the reorder script."));
        }
      } catch (err) {
        reject(err);
      }
    });
  });
}
  

async function checkIfFilesWereConvertedSuccessfully(retries=1){
  let pathToInputDir = path.join(__dirname, './reorder-app/input');
  let pathToOutputDir = path.join(__dirname, './reorder-app/output');

  let numberOfInputFiles = await readNumberOfFilesFromDir(pathToInputDir);
  let numberOfOutputFiles = await readNumberOfFilesFromDir(pathToOutputDir);

  let retryRef;

  if(!numberOfInputFiles || !numberOfOutputFiles) {
    console.log("There are no files in the input or output directory. Trying again: " + retries + " of 3");
    if(retries < 3){
      retryRef = setTimeout(async () => {
        await checkIfFilesWereConvertedSuccessfully(retries + 1);
      }, 1000 * retries);
    }
  } else {
      clearTimeout(retryRef);
      return numberOfInputFiles === numberOfOutputFiles;
  }

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