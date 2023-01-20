"use strict";


class Posts {
    constructor() {
        this.posts = []
    }

    getPosts(limit , offset) {
        const { token } = getLoginData();
        fetch(`https://microbloglite.herokuapp.com/api/posts?limit=${limit}&offset=${offset}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`
        }
        })
        .then(response => response.json())
        .then(result => {result.forEach(post => this.posts.push(new Post( post._id , post.text , post.username , post.createdAt , post.likes)))})
        .then(result => this.displayPosts())
        .catch(error => console.log("error", error));
    }

    displayPosts(mypost) {
        document.getElementById("post").innerHTML = this.posts.map(post => postTemplate(post)).join(" ")
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
         this.posts.map(post => {
            let currentpost = document.getElementById(post.id)
            console.log(post)
            currentpost.addEventListener("click" , function() {post.like()})
        })
    }
}

class Post {

    constructor( id , text  , username , createdAt , likes) {
        this.id = id
        this.text = text
        this.username = username
        this.createdAt = createdAt
        this.likes = likes
        // console.log(this.id)
    }

    like() {
        const { token } = getLoginData();
        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");
        console.log(myHeaders)
        var raw = JSON.stringify({
            "postId": `${this.id}`
        });

        var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("https://microbloglite.herokuapp.com/api/likes", requestOptions)
        .then(response => response.json())
        .then(result => console.log(this.id))
        .catch(error => console.log('error', error));
    }

    unlike() {
        //todo
    }

    numberOfLikes() {
        // console.log(this.likes.length)
        return this.likes.length
    }

    post() {
        //todo
    }
}

function postTemplate(post) {
    const date = new Date(Date.parse(post.createdAt));
    const template = `
    <div class="card">
        <div class="card-content">
            <div class="media-content">
                <p class="title is-4"></p>
                <p class="subtitle is-6">@${post.username}</p>
            </div>
            </div>

            <div class="content">
            <p>${post.text} - ${post.id}</p>
            <br>
            <button id="${post.id}">Like</button>
           
            </br>
            <time datetime="2016-1-1">${date.toLocaleDateString()}</time>
            </div>
        </div>
    </div>
    `
   return template
}


let allposts = new Posts()
allposts.getPosts(1000 , 0)