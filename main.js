
/*
  Validate input fields
  Student's Name : Only charachter
  Students' Id : Only number
  Student's Email : Only email 
  Student's COntatct number : Only number and of 10 digit
*/

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("studentForm");
  
    const sname = document.getElementById("sname");
    const stdid = document.getElementById("stdid");
    const email = document.getElementById("email");
    const contact = document.getElementById("contact");
    displayStudentsRecord();
    function loadStudents() {
      const data = localStorage.getItem("students");
      console.log('students data'+ data)
      return data ? JSON.parse(data) : {};
    }

    function displayStudentsRecord() {
      const students = loadStudents();
      const studentList = document.getElementById("studentList");
      studentList.innerHTML ="";
      const studentArray = Object.entries(students); 
      const studentListul = document.createElement("ul");
      studentList.appendChild(studentListul);
      const studentListRow = document.createElement("div");
      studentListRow.className = "header-row";
     
      ["Id", "Name", "Email", "Contact", " "].forEach(text => {
        const div = document.createElement("div");
        div.className = "cell header";
        div.textContent = text;
        studentListRow.appendChild(div);
      });
      studentList.appendChild(studentListRow);

      studentArray.forEach(([id, student], index) => {
        const studentRow = document.createElement("div");
        studentRow.className = "student-row ";
        studentRow.id = "row_"+id;
        Object.values(student).forEach(value => {
          const div = document.createElement("div");
          div.className = "cell";
          div.textContent = value;
          studentRow.appendChild(div);
        });
        const action = document.createElement("div");
        action.className = "cell action";

        const editBtn = document.createElement("button");
        editBtn.textContent = "Edit";
        editBtn.className = "action-btn";
        editBtn.onclick = () => editRow(id,studentRow);
        action.appendChild(editBtn);

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.className = "action-btn";
        deleteBtn.onclick = () => deleteRow(id,studentRow);
        action.appendChild(deleteBtn);

        studentRow.appendChild(action);

        studentList.appendChild(studentRow);
      });


    }

    function deleteRow(studentId,studentRow) {
      
      if (!confirm("Delete this student?")) return;
    
      let students = JSON.parse(localStorage.getItem("students")) || [];
    
      delete students[studentId];
    
      localStorage.setItem("students", JSON.stringify(students));
  
      studentRow.remove();
    }

    // ---------- Display Error ----------
    function displayError(element, message) {
      let errorDiv = element.parentElement.querySelector(".error");
      if (!errorDiv) {
        element.style.marginBottom = "2px";
        errorDiv = document.createElement("div");
        errorDiv.className = "error";
        errorDiv.innerText = message;
        element.parentElement.appendChild(errorDiv);
      }
    }
  
    // ---------- Remove Error Div ----------
    function removeError(element) {
      const errorDiv = element.parentElement.querySelector(".error");
      if (errorDiv) {
        element.style.marginBottom = "15px";
        errorDiv.remove();
      }
    }
  
    // ---------- Validate email ----------
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
  
    // ---------- Save Student data in localstorage ----------
    function saveStudentData(student) {
      // Get existing students object or create new
      let students = JSON.parse(localStorage.getItem("students")) || {};
    
      // Use student ID as key
      students[student.id] = student;
    
      // Save back to localStorage
      localStorage.setItem("students", JSON.stringify(students));
    }

    // ---------- Form Submit message ----------

    function formSubmitted(){
      const successMessage = document.createElement('h4');
      successMessage.innerText = "Student's record saved successfully";
      successMessage.style.color = "red";
      form.prepend(successMessage);
      setTimeout(() => {
        successMessage.classList.add("fade-out");
      }, 1000); 

      setTimeout(() => {
        successMessage.remove();
      }, 3000);
    }
    // ---------- Live validation ----------
    sname.addEventListener("input", function () {
      this.value = this.value.replace(/[^a-zA-Z\s]/g, "");
      this.value.trim() === ""
        ? displayError(this, "Please enter characters only")
        : removeError(this);
    });
  
    stdid.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
      this.value.trim() === ""
        ? displayError(this, "Please enter numbers only")
        : removeError(this);
    });
  
    email.addEventListener("input", function () {
      !isValidEmail(this.value.trim())
        ? displayError(this, "Please enter a valid email")
        : removeError(this);
    });
  
    contact.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, "");
        
        this.value.trim().length == "" || this.value.length != 10
        ? displayError(this, "Please enter a valid 10 digit number")
        : removeError(this);
    });

    // ---------- Form submit validation ----------
    form.addEventListener("submit", function (e) {
      e.preventDefault(); // 
  
      let hasError = false;
  
      if (sname.value.trim() === "") {
        displayError(sname, "Please enter name");
        sname.focus();
        hasError = true;
      }
  
      if (stdid.value.trim() === "") {
        displayError(stdid, "Please enter ID");
        if (!hasError) stdid.focus();
        hasError = true;
      }
  
      if (!isValidEmail(email.value.trim())) {
        displayError(email, "Please enter a valid email");
        if (!hasError) email.focus();
        hasError = true;
      }

      if ((contact.value.trim() === "") || (contact.value.length != 10)){
        displayError(contact, "Please enter a valid 10 digit number")
        if (!hasError) contact.focus();
        hasError = true;
      }
  
      if (!hasError) {
        const student = {
          id: document.getElementById("stdid").value.trim(),
          name: document.getElementById("sname").value.trim(),
          email: document.getElementById("email").value.trim(),
          contact: document.getElementById("contact").value.trim()
        };
      
        saveStudentData(student);
        formSubmitted();
        displayStudentsRecord();
        form.reset();
      }
    });
  
  });
  