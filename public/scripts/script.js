const fileUploadForm = document.querySelector("#file-upload-form");
const fileSelect = document.querySelector("form input[type=file]");
const fileName = document.querySelector("form .file-name");



fileUploadForm.addEventListener("submit", async (e) => {
  //e.preventDefault();
  console.log("Uploading...");
  // let files = fileSelect.files;

  // console.log(files);
  
  // let data = await handleSubmit(files);
  // console.log(data);
});


fileSelect.addEventListener("change", (e) => {
  if (fileSelect.files.length > 0) {
    let name = fileSelect.files[0].name;
    fileName.innerText = name;
  }
})



// async function handleSubmit(fileData){
//   const options = {
//     method: "POST",
//     headers: {
//       // "Content-Type": "multipart/form-data"
//     },
//     body: fileData
//   }

//   try 
//   {
//     const response = await fetch("/reorder", options);
//     return response.json();
//   }
//   catch(error)
//   {
//     console.error(error);
//   }
  
// }