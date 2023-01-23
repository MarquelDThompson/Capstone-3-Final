// returns the element of specified id (RegisterForm).
const form = document.getElementById('registertrationForm')
// returns the Element object representing the element whose id property matches the specified string
function registerUser(event) 
{
// validation below if finished

const usernameInput = document.getElementById('username').value;
const fullnameInput = document.getElementById('fullname').value;
const passwordInput = document.getElementById('password').value; 
    
// event.preventDefault();

var myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
  "username": usernameInput,
  "fullName": fullnameInput,
  "password": passwordInput,
});

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("https://microbloglite.herokuapp.com/api/users", requestOptions)
  .then(response => response.text())
  .then(result => 
    {
        document.getElementById("popmessage").innerHTML = "user successfuly registered";
        console.log(result);
        window.location.href="login.html"
    }
  )
}
form.addEventListener('submit',  registerUser)


