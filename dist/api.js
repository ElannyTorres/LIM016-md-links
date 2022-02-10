"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.pathExist =
  exports.pathAbsolute =
  exports.openDir =
  exports.mdFiles =
  exports.isFile =
  exports.isDirectory =
  exports.getStatusLinks =
  exports.getLinks =
    void 0;

var _fs = require("fs");

var _path = require("path");

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

// Import FyleSystem Module
// Import Path Module
// Import Fetch Module
// *Steps to follow
// *1. Verify if path exists
const pathExist = (enteredPath) => (0, _fs.existsSync)(enteredPath); // boolean
// *2. Is the Path Absolute? - 2.1 Convert the Path

exports.pathExist = pathExist;

const pathAbsolute = (enteredPath) => {
  //Verify if the path is absolute
  if ((0, _path.isAbsolute)(enteredPath)) {
    return enteredPath;
  } else {
    // We know the path is not absolute
    // Convert the path to Absolute
    return (0, _path.resolve)(enteredPath);
  }
}; // *3. Is it a Directory?

exports.pathAbsolute = pathAbsolute;

const isDirectory = (enteredPath) => {
  let stastObj = (0, _fs.statSync)(enteredPath);
  return stastObj.isDirectory(); // boolean
}; // *4. Is it a File?

exports.isDirectory = isDirectory;

const isFile = (enteredPath) => {
  let stastObj = (0, _fs.statSync)(enteredPath);
  return stastObj.isFile(); // boolean
}; // *5. Filter MD File
// *5.1 Open Directory

exports.isFile = isFile;

const openDir = (enteredPath) => {
  let items = (0, _fs.readdirSync)(enteredPath);
  let mdArray = [];
  items.forEach((item) => {
    let itemPath = enteredPath + "/" + item; // console.log(itemPath);

    if (!isFile(itemPath)) {
      mdArray.push(openDir(itemPath));
    } else {
      if ((0, _path.extname)(item) === ".md") {
        mdArray.push(itemPath);
      }
    }
  });
  return mdArray.flat(Infinity); // console.log(mdArray); // array con archivos md
}; // 5.2 MDFile Array

exports.openDir = openDir;

const mdFiles = (array) =>
  array.filter((file) => (0, _path.extname)(file) == ".md"); // 6. Does it have link(s)? - Obtain link(s)
// Read the md file - readFile()
// *7. Validate (true or false)
// 7.1 false = href, text, file

exports.mdFiles = mdFiles;

const getLinks = (array) => {
  const newArray = array.map((file) => {
    const promiseObtain = new Promise((resolve, reject) => {
      // eslint-disable-next-line no-useless-escape
      const urlText = /\[([^\[]+)\](\(.*\))/gm; // texto con el link

      const urlRegex = /(https?:\/\/[^\s]+)/g; // buscar el link

      const justText = /\[[^\s]+(.+?)\]/gi;
      const linkArray = [];
      (0, _fs.readFile)(file, "utf-8", (error, data) => {
        if (error) {
          return reject(error);
        }

        let link = data.match(urlText);

        if (link) {
          // console.log(link);
          link.forEach((url) => {
            const linkmd = url.match(urlRegex).join().slice(0, -1);
            const textmd = url.match(justText).join().slice(1, -1); // console.log(textmd);
            // console.log(linkmd);

            const info = {
              href: linkmd,
              text: textmd,
              file: file,
            };
            linkArray.push(info);
          });
        }

        resolve(linkArray);
      });
    });
    return promiseObtain;
  });
  return Promise.all(newArray);
}; // *7.2 true = href, text, file, status, ok

exports.getLinks = getLinks;

const getStatusLinks = (linksArray) => {
  const newArray = linksArray.map((item) => {
    const fetchPromise = (0, _nodeFetch.default)(item.href)
      .then((response) => {
        const status = response.status;
        const message =
          response.status >= 200 && response.status <= 299
            ? response.statusText
            : "FAIL";
        return {
          href: item.href,
          text: item.text,
          file: item.file,
          status: status,
          message: message,
        };
      })
      .catch(() => {
        return {
          href: item.href,
          text: item.text,
          file: item.file,
          status: "Failed request",
          message: "FAIL",
        };
      });
    return fetchPromise;
  });
  return Promise.all(newArray);
}; // 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
// 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

exports.getStatusLinks = getStatusLinks;
