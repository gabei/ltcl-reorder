const fileUpload = document.getElementById("file-upload");
const fileSelect = document.getElementById("file-select");



fileUpload.addEventListener("submit", async (e) => {
  e.preventDefault();
  console.log("Uploading...");
  // let files = fileSelect.files;

  // console.log(files);
  
  // let data = await handleSubmit(files);
  // console.log(data);
});



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