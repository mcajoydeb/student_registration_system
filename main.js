
/*
  Validate input fields
  Student's Name : Only charachter
  Students' Id : Only number
  Student's Email : Only email 
  Student's COntatct number : Only number and of 10 digit
*/

// Validate student's name

document.getElementById("sname").addEventListener("input", function () {
    this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
    const message = "Please enter character only";
    
    if(this.value == '')
       displayError(this, message)
    else if(this.value.length <= 1){
        removeError(this)
    }
        
});


// Validate student's ID


document.getElementById("stdid").addEventListener("input", function () {
    this.value = this.value.replace(/[^0-9]/g, "");
    const message = "Please enter character only";
    
    if(this.value == '')
       displayError(this, message)
    else if(this.value.length <= 1){
        removeError(this)
    }
        
});

function removeError(element){ 
    let hasErrorDiv = element.parentElement.querySelector(".error");
    if(hasErrorDiv)
        element.style.marginBottom ="15px";
        hasErrorDiv.remove();
}

function displayError(element, message){
    let hasErrorDiv = element.parentElement.querySelector(".error");
    if(!hasErrorDiv){
        element.style.marginBottom ="2px";
        errorDiv = document.createElement("div");
        errorDiv.className = "error";
        errorDiv.innerText = message;
        element.parentElement.appendChild(errorDiv);
    }
}