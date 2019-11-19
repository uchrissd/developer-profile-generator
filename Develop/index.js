const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const PDFDocument = require("pdfkit");
const request = require("request");

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
    });
    console.log("you did it");
  });
//Function generates the PDF document
pdfGen = async dataObject => {
  const doc = new PDFDocument();
  doc.pipe(fs.createWriteStream("./tmp3.pdf")); // write to PDF

  displayItemsPDF(doc, dataObject);

  // add stuff to PDF here using methods described below...
  // finalize the PDF and end the stream
};
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

  pdfGen(dataObject);
};

displayItemsPDF = async (doc, dataObject) => {
  const url = dataObject.userPic;
  console.log(url);
  let uri = await getB64ImageURI(url);
  doc
    .image(uri, {
      fit: [150, 150],
      align: "center",
      valign: "top"
    })
    .fontSize(25)
    .text(dataObject.name, 100, 100)
    .text(dataObject.userUrl, 100, 100);

  doc.end();
};

// Get image function
getB64ImageURI = url => {
  return new Promise((resolve, reject) => {
    request({ url, encoding: null }, (error, response, body) => {
      if (error || response.statusCode != 200) {
        reject(error);
      }
      const img = Buffer.from(body);
      const contentType = response.headers["content-type"];
      resolve("data:" + contentType + ";base64," + img.toString("base64"));
    });
  });
};

// getUserUrl = dataObject => {
//   const userUrl = dataObject.userUrl;
//   console.log(userUrl);
// };

// getLocation = dataObject => {
//   const location = dataObject.userLocation;
//   console.log(location);
// };

// getBlog = dataObject => {
//   const blog = dataObject.userBlog;
//   console.log(blog);
// };

// getBio = dataObject => {
//   const bio = dataObject.userBio;
//   console.log(bio);
// };

// getRepos = dataObject => {
//   const repos = dataObject.userRepos;
//   console.log(repos);
// };

// getFollowers = dataObject => {
//   const followers = dataObject.userFollowers;
//   console.log(followers);
// };

// getStarredRepos = dataObject => {
//   const starredRepos = dataObject.userStarredRepos;
//   console.log(starredRepos);
// };

// getFollowing = dataObject => {
//   const following = dataObject.userFollowing;
//   console.log(following);
// };
