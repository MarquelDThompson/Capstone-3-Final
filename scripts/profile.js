/* Posts Page JavaScript */

"use strict";

/* Card for dsiplaying blog posts */

function postTemplate() {
    return `
    <div class="card">
    <div class="card-content">
        <div class="media">
        <div class="media-left">
            <figure class="image is-48x48">
            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image">
            </figure>
        </div>
        <div class="media-content">
            <p class="title is-4">John Smith</p>
            <p class="subtitle is-6">@johnsmith</p>
        </div>
        </div>

        <div class="content">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        Phasellus nec iaculis mauris. <a>@bulmaio</a>.
        <a href="#">#css</a> <a href="#">#responsive</a>
        <br>
        <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
        </div>
    </div>
    </div>
    `
}


function createApost () {

  // get the token from the getLoginData() function
  const token = getLoginData() 
   // log the token to the console
  console.log(token.token)
  // creates a new Headers object
  let myHeaders = new Headers();

  myHeaders.append("Authorization", "Bearer " + token.token);
  myHeaders.append("Content-Type", "application/json");
  // creating a new object with the text from the element with id "postArea"
  let raw = JSON.stringify({
    text: document.getElementById("postArea").value,
  });

   // loging the raw object to the console
  console.log(raw)

  // creating a request options object to pass to the fetch function
  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };
 // making a post request to the specified URL
  fetch("https://microbloglite.herokuapp.com/api/posts", requestOptions)
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
  // clearing the value of the "postArea" element after a post is submitted 
   document.getElementById("postArea").value=" ";
}



