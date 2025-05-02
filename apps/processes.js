import { spawn } from "child_process";


const spawnOptions = {
  cwd: "./reorder-app/reorder.py",
  timeout: 5000,
  windowsHide: true,

}


export default async function initializeReorderScript(){

  const spawnReorder = spawn("python", spawnOptions);

  spawnReorder.stdout.on("data", (data) => {
    console.log("Reorder script complete. Data saved to output directory.");
  })

  spawnReorder.stderr.on("data", (data) => {
    console.log("There was an error while running reorder.py:");
    console.error(data);
  })

  spawnReorder.on("close", (code) => {
    console.log("Process closed with code " + code);
  })

}