const { application, application } = require("express");

const baseUrl = "http://localhost:5000/"

// =========================================================================
// Get method with fetch api, utilising fetchUser and displayUsers functions
// =========================================================================
const fetchUser = () => {
    const url = `${baseUrl}showUsers`;
    fetch(url)
        .then(function (r) {
            console.log(r)
            return r.json();
        })
        .then(function (res) {
            displayUsers(res)
        })
        .catch(function (err) {
            console.log(err)
        })
}
fetchUser();

function displayUsers(res) {
    const tBody = document.getElementById('userList');
    let htmlData = "";
    for (i = 0; i < res.length; i++) {
        htmlData += `<tr>`
      htmlData += `<td> ${res[i].user_name}</td>`;
      htmlData += `<td> ${res[i].fullname}</td>`;
      htmlData += `<td> ${res[i].contact}</td>`;
      htmlData += `<td> ${res[i].email}</td>`;
      htmlData += `</tr>`
    }
    tBody.innerHTML = htmlData;
}

// ==========================================================================
// Post method with axios, utilising FormData object and form submit listener
// ==========================================================================
const form = document.querySelector("form");
form.addEventListener('submit', (e) => {
  e.preventDefault();
const formData =new FormData(form)
const formDataObj = {};
formData.forEach((value, key) => (formDataObj[key] = value));
console.log(formDataObj);
axios.post("http://localhost:5000/register",formDataObj)
.then(function(response){
fetchUser();
console.log(response.data)
})
.catch(err=>{
    console.log(err)
})
});

// ====================================================================================
// Post method with axios, utilising direct object passing and button click listener
// ====================================================================================
// const send = document.getElementById('send');
// send.addEventListener('click', addUser);
// function addUser(){
// const username = document.getElementById('username').value
// const fullname = document.getElementById('fullname').value
// const contact = document.getElementById('contact').value
// const email = document.getElementById('email').value
// const userData = {
//     user_name: username,
//     fullname: fullname,
//     contact: contact,
//     email: email
// };
// axios.post("http://localhost:5000/register",userData)
// .then(function(response){
// fetchUser();
// console.log(response.data)
// })
// .catch(err=>{
//     console.log(err)
// })
// }


// ==============================================================================
// Post method with fetch api, utilising FormData object and form submit listener
// ==============================================================================
// const addUser = () => {
// var form=document.getElementById('form')

// form.addEventListener('submit', function(e){
//  e.preventDefault()
//  const payload ={};
//  new FormData(form).forEach((value,key)=>payload[ key ]=value);
//  const url = `${baseUrl}register`;
//     fetch(url, {
//     method: 'POST',
//     headers: {
//         "Content-Type": "application/json",
//     },
//     body: JSON.stringify(payload)
//     })
//     .then(r => r.json())
//     .then(res => { 
//         console.log(res)}
//         )
//     .catch(error => console.error('Error:', error)); 
// });
// }
// ================================================================================================ 







   



