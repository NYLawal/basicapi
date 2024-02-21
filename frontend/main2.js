// const { application, application } = require("express");

const baseUrl = "http://localhost:5000/";

// =========================================================================
// Get method with fetch api, utilising fetchUser and displayUsers functions
// =========================================================================
const fetchUser = () => {
  const url = `${baseUrl}showUsers`;
  fetch(url)
    .then(function (r) {
      console.log(r);
      return r.json();
    })
    .then(function (res) {
      displayUsers(res);
    })
    .catch(function (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error Connecting to the database",
      });
    });
};
fetchUser();
// append database enteries to form list
function displayUsers(res) {
  const tBody = document.getElementById("userList");
  let htmlData = "";
  for (i = 0; i < res.length; i++) {
    htmlData += `<tr>`;
    htmlData += `<td> ${res[i].username}</td>`;
    htmlData += `<td> ${res[i].fullname}</td>`;
    htmlData += `<td> ${res[i].contact}</td>`;
    htmlData += `<td> ${res[i].email}</td>`;
    htmlData += `</tr>`;
  }
  tBody.innerHTML = htmlData;
}

// ==========================================================================
// invoke url, supply collected form data to url as body and apply responses as received
// to trigger error messages accordingly, or show success msg and reload to show new data
// ==========================================================================
const addUser = (userFormInput) => {
  axios
    .post(`${baseUrl}register`, userFormInput)
    .then(function (response) {
      if (
        response.data.message.includes("Invalid") ||
        response.data.message.includes("Duplicate")
      ) {
        Swal.fire({
          icon: "error",
          title: "Error Processing Input",
          text: response.data.message,
        });
      } else {
        fetchUser();
        Swal.fire({
          toast: true,
          icon: "success",
          title: "Posted successfully",
          animation: false,
          position: "bottom",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

// ==========================================================================
// check if any of the form fields are empty and trigger error message, else call addUser fxn
// ==========================================================================
function checkIsEmpty(data) {
  for (var key in data) {
    if (data[key] == "") {
      return Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Empty input detected!",
      });
    }
  }
  addUser(data);
}

// ==========================================================================
// Post method with axios, utilising FormData object and form submit listener
// ==========================================================================
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const formDataObj = {};
  formData.forEach((value, key) => (formDataObj[key] = value));
  checkIsEmpty(formDataObj);
});
