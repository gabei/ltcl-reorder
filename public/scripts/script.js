const fileUploadForm = document.querySelector("#file-upload-form");
const fileSelect = document.querySelector("form input[type=file]");
const fileName = document.querySelector("form .file-name");
const errorDiv = document.querySelector("#error-message");
const downloadsContainer = document.querySelector(".downloads");


fileUploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("file-input", fileSelect.files[0]);
  const result = await handleSubmit(formData);
  console.log(result);
  const blob = await result.blob();
  console.log(blob);

  const newFile = new File([blob], "output-1.csv", {  type: "text/csv" });
  createDownload(newFile, newFile.name);
});


fileSelect.addEventListener("change", (e) => {
  if (fileSelect.files.length > 0) {
    let name = fileSelect.files[0].name;
    fileName.innerText = name;
  }
})


function displayResponse(message) {
  
  if(message.status === "success"){
    errorDiv.innerText = message;
    errorDiv.backgroundColor = "#85e68f";
  }

  if(message.status === "error"){
    errorDiv.innerText = message.message;
    errorDiv.backgroundColor = "#e68585";
  }
} 



async function handleSubmit(formData){
  const options = {
    method: "POST",
    body: formData
  }

  try 
  {
    const response = await fetch("/reorder", options);
    return response;
  }
  catch(error)
  {
    return error;
  }
  
}



function createDownload(sourceBlob, fileName) {
  
  const downloadListItem = document.createElement("li");
  const downloadLink = document.createElement("a");
  downloadListItem.appendChild(downloadLink);

  downloadLink.innerText = fileName;
  downloadLink.href = sourceBlob;
  downloadLink.download = fileName;

  downloadsContainer.appendChild(downloadListItem);
  downloadsContainer.style.display = "block";
}


