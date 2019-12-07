const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const PDFDocument = require("html-pdf");
const request = require("request");
const gHTML = require("generate-html");

//Inquirer function
inquirer
  .prompt([
    {
      message: "Enter your GitHub username:",
      name: "username"
    },
    {
      message: "What is your favorite color:",
      name: "favoriteColor"
    }
  ])
  //Axios api call function
  .then(({ username }) => {
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(res => {
      getData(res);
      fs.writeFile(filename, data, function(err, data) {
        if (err)
        return err
      }
      resolve(data)
    });
    console.log("you did it");
  });

getData = res => {
  // Set variables in an object here
  const dataObject = {
    name: res.data.name,
    userPic: res.data.avatar_url,
    userUrl: res.data.html_url,
    userLocation: res.data.location,
    userBlog: res.data.blog,
    userBio: res.data.bio,
    userRepos: res.data.public_repos,
    userFollowers: res.data.followers,
    userStarredRepos: res.data.starred_url,
    userFollowing: res.data.following
  };
  return dataObject;
};

function profilePhotoHead(res) {
  return `
  <div class = "wrapper">>
      <div class = "row">
      <div class = "photo-header col">
          <img src = ${res.data.avatar_url}, alt="self-photo">
          <h1> My name is ${res.data.name}. </h1>
          <h3> Currently ${res.data.company}.</h3>
          <div class = "links-nav">
              <div class = "nav-link"> <a href="https://www.google.com/maps/place/${res.data.location}">${res.data.location}</a></div>
              <div class = "nav-link"> <a href=${res.data.html_url}>GitHub</a></div>
              <div class = "nav-link"> <a href=${res.data.blog}>Blog</a></div>
          </div>
      </div>
      </div>
  `;
}

function getStats(res) {
  return `
  <main>
  <div class = container>
      <h3 class="col">${res.data.bio}</h3>
      <div class = "row">
          <div class = "col card">
              <h3>Public Repositories</h3>
              <h4>${res.data.public_repos}</h4>
          </div>
          <div class = "col card">
              <h3>Followers</h3>
              <h4>${res.data.followers}</h4>
          </div>
      </div>
      <div class = "row">
          <div class = "col card">
              <h3>Git Hub Stars</h3>
              <h4>0</h4>
          </div>
          <div class = "col card">
              <h3>Following</h3>
              <h4>${res.data.following}</h4>
          </div>
      </div>
  </div>
  </main>
  </div>
  </body>  `;
}
async function getStars(username) {
  try {
    const starUrl = `https://api.github.com/users/${username}/starred?per_page=100`;
    await axios.get(starUrl).then(function(res) {
      console.log(res.data.length);
    });
  } catch (err) {
    console.log(err);
  }
}


