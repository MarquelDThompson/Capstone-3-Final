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
        .then(result =>
             {
                result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                
                result.forEach(post => this.posts.push(new Post( post._id , post.text , post.username , post.createdAt , post.likes)))      
        })
        .then(result => this.displayPosts())
        .catch(error => console.log("error", error));
    }

    displayPosts(mypost) {
        document.getElementById("post").innerHTML = this.posts.map(post => postTemplate(post)).join(" ")
        
         this.posts.map(post => {
            let currentpost = document.getElementById(post.id)
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
}

function postTemplate(post) {
    const date = new Date(post.createdAt)
        return`
        <div class="card">
            <div class="card-content">
                <div class="media-content">
                    <p class="title is-4"></p>
                    <p class="subtitle is-6">@${post.username}</p>
                </div>
                </div>
    
                <div class="content">
                <p>${post.text}</p>
                <br>
                <button id="${post.id}" class="button-1 isLiked" role="button">Like</button>
                <p>${post.likes.length}</p>
                </br>
                <time datetime="${date}">${getDate(date)} </time>
                </div>
            </div>
        </div>
        `
}

// function isLiked(likes) {
//     for(let like of likes) {
//         if(like)
//     }
// }

function getDate(date){
 
    const months = ["January" , "February" , "March" , "April" , "May" , "June" , "July" , "August" , "September" , "October" , "November" , "December"]
    let day = date.getDate()
    let month = date.getMonth()
    let Year = date.getFullYear()
    let hours = date.getHours()
    let minutes = date.getMinutes()

    if(hours <= 12) {return `${months[month].toString()} ${day}, ${Year} at ${hours}:${minutes >= 10 ? minutes.toString() : "0" + minutes} a.m.`} 
    else{ return  `${months[month]} ${day} at ${hours - 12}:${minutes >= 10 ? minutes.toString() : "0" + minutes} p.m` }
}

let allposts = new Posts()
allposts.getPosts(1000 , 0)