const fileUploadForm = document.querySelector("#file-upload-form");
const fileSelect = document.querySelector("form input[type=file]");
const fileName = document.querySelector("form .file-name");



fileUploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("file-input", fileSelect.files[0]);
  const result = await handleSubmit(formData);
  displayError(result);
});



fileSelect.addEventListener("change", (e) => {
  if (fileSelect.files.length > 0) {
    let name = fileSelect.files[0].name;
    fileName.innerText = name;
  }
})



function displayError(message) {
  const errorDiv = document.querySelector("#error-message");
  errorDiv.innerText = message;
  errorDiv.style.display = "block";
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


