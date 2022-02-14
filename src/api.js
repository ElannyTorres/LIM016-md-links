// Import FyleSystem Module
import { existsSync, statSync, readdirSync, readFile } from "fs";
// Import Path Module
import { isAbsolute, resolve, extname } from "path";
// Import Fetch Module
import fetch from "node-fetch";

// *Steps to follow
// *1. Verify if path exists
export const pathExist = (enteredPath) => existsSync(enteredPath); // boolean

// *2. Is the Path Absolute? - 2.1 Convert the Path
export const pathAbsolute = (enteredPath) => {
  //Verify if the path is absolute
  if (isAbsolute(enteredPath)) {
    return enteredPath;
  } else {
    // We know the path is not absolute
    // Convert the path to Absolute
    return resolve(enteredPath);
  }
};

// *3. Is it a Directory?
export const isDirectory = (enteredPath) => {
  let stastObj = statSync(enteredPath);
  return stastObj.isDirectory(); // boolean
};

// *4. Is it a File?
export const isFile = (enteredPath) => {
  let stastObj = statSync(enteredPath);
  return stastObj.isFile(); // boolean
};

// *5. Filter MD File
// *5.1 Open Directory
export const openDir = (enteredPath) => {
  let items = readdirSync(enteredPath);
  let mdArray = [];
  items.forEach((item) => {
    let itemPath = enteredPath + "/" + item;
    // console.log(itemPath);
    if (!isFile(itemPath)) {
      mdArray.push(openDir(itemPath));
    } else {
      if (extname(item) === ".md") {
        mdArray.push(itemPath);
      }
    }
  });
  return mdArray.flat(Infinity);
  // console.log(mdArray); // array con archivos md
};

// 5.2 MDFile Array
export const mdFiles = (array) =>
  array.filter((file) => extname(file) == ".md");

// 6. Does it have link(s)? - Obtain link(s)
// Read the md file - readFile()
// *7. Validate (true or false)
// 7.1 false = href, text, file
export const getLinks = (array) => {
  const newArray = array.map((file) => {
    const promiseObtain = new Promise((resolve, reject) => {
      // eslint-disable-next-line no-useless-escape
      const urlText = /\[([^\[]+)\](\(.*\))/gm; // texto con el link
      const urlRegex = /(https?:\/\/[^\s]+)/g; // buscar el link
      const justText = /\[[^\s]+(.+?)\]/gi;
      const linkArray = [];
      readFile(file, "utf-8", (error, data) => {
        if (error) {
          return reject(error);
        }
        let link = data.match(urlText);
        if (link) {
          link.forEach((url) => {
            const linkmd = url.match(urlRegex).join().slice(0, -1);
            const textmd = url.match(justText).join().slice(1, -1);
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
};

// *7.2 true = href, text, file, status, ok
export const getStatusLinks = (linksArray) => {
  const newArray = linksArray.map((item) => {
    const fetchPromise = fetch(item.href)
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
};
