const fileUploadForm = document.querySelector("#file-upload-form");
const fileSelect = document.querySelector("form input[type=file]");
const fileName = document.querySelector("form .file-name");
const errorDiv = document.querySelector("#error-message");


fileUploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("file-input", fileSelect.files[0]);
  const result = await handleSubmit(formData);
  console.log(result.json());
  displayResponse(result);
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
    return response.json();
  }
  catch(error)
  {
    return error;
  }
  
}


