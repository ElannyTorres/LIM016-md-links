// Import FyleSystem Module
const fs = require("fs");
// Import Path Module
const path = require("path");
// Import http Module

// Steps to follow
// 1. Verify if path exists
const pathExist = (enteredPath) => fs.existsSync(enteredPath); // boolean
// 2. Is the Path Absolute? - 2.1 Convert the Path
const pathAbsolute = (enteredPath) => {
  //Verify if the path is absolute
  if (path.isAbsolute(enteredPath)) {
    return enteredPath;
  } else {
    // We know the path is not absolute
    // Convert the path to Absolute
    return path.resolve(enteredPath);
  }
};

// 3. Is it a Directory?
const isDirectory = (enteredPath) => {
  stastObj = fs.statSync(enteredPath);
  return stastObj.isDirectory(); // boolean
};

// 4. Is it a File?
const isFile = (enteredPath) => {
  stastObj = fs.statSync(enteredPath);
  return stastObj.isFile(); // boolean
};

// 5. Filter MD File
// 5.1 Open Directory
const openDir = (enteredPath) => {
  let filesList = fs.readdirSync(enteredPath);
  filesList.forEach((file) => {
    console.log(file);
  });
};
// 5.2 MDFile Array
const mdFiles = (array) => array.filter((file) => path.extname(file) == ".md");

// 6. Does it have link(s)? - Obtain link(s)
// 7. Validate (true or false)
// 7.1 true = href, text, file, status, ok
// 7.2 false = href, text, file
