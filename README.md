# Developer Profile Generator

**Description**
The developer profile generator is an application that generates a PDF resume based on information from a user's GitHub account.

**Motivation**
The goal of the program is to make it easier for a prospective employer to generate PDF resumes.

**User Story**
Given that I am someone interested in hiring a developer, I want a program that can take the a GitHub username and generate a simple PDF with basic information about the job applicant.

**Build status**

The build status is complete.

**Code style**

The application is written in JavaScript and node.js.

**Screenshots**
![Screenshot](Assets/profle-screenshot.jpg)
![Screenshot](Assets/images/profle-screenshot.jpg)

**Code Example**

```javascript
//Inquirer function
inquirer
  .prompt([
    {
      message: "Enter your GitHub username:",
      name: "username"
    },
    {
      message: "What is your favorite color:",
      name: "color"
    }
  ])
  //Axios api call function
  .then(answer => {
    console.log(answer);
    var html = genhtml.generateHTML(answer);
    var username = answer.username;
    const queryUrl = `https://api.github.com/users/${username}`;
    axios.get(queryUrl).then(res => {
      let photo = profilePhotoHead(res);
      let stats = getStats(res);
      html = html + photo + stats;
      fs.writeFile("developerHTML.html", html, function(err, data) {
        if (err) return err;
        return data;
      });

      PDFDocument.create(html).toFile(`./${username}Profile.pdf`, function(
        err,
        res
      ) {
        if (err) return console.log(err);
        console.log(res);
      });

      console.log("you did it");
    });
  });
```

**Installation**

No installation necessary.
