import {
  pathAbsolute,
  pathExist,
  isFile,
  mdFiles,
  getLinks,
  getStatusLinks,
  isDirectory,
  openDir,
} from "./api.js";

export const mdlinks = (path, options = { validate: false }) => {
  // parámetro por defecto
  return new Promise((resolve, reject) => {
    if (!pathExist(path)) {
      reject(console.log("The enteredPath does not exist"));
    }
    /* if(!isFile(path) || !isDirectory(path)) {
      reject(console.log("The enteredPath is not a file nor a directory, please enter a directory or a file."))
    } */
    if (pathExist(path)) {
      console.log(pathExist(path));
      const absolutePath = pathAbsolute(path);
      let fileArray = [];
      // *First file
      if (isFile(path)) {
        console.log("The enteredPath is a file");
        fileArray.push(absolutePath);
        console.log(fileArray);
        if (mdFiles(fileArray)) {
          console.log("It is a md file");
          getLinks(fileArray)
            .then((res) => {
              console.log(res.flat());
            })
            .catch((err) => console.log(err));
        } else {
          reject(console.log("The enteredPath is not a md file."));
        }
      } else if (isDirectory(path)) {
        console.log("The path is a directory");
        fileArray.push(openDir(absolutePath));
        const flatFileArray = fileArray.flat();
        console.log(flatFileArray);
        if (flatFileArray.length > 0) {
          getLinks(flatFileArray)
            .then((res) => {
              if (res.length === 0) {
                console.log("There is no links in the path.");
              } else {
                if (options.validate) {
                  console.log("Pedir status");
                  getStatusLinks(res.flat())
                    .then((res) => {
                      console.log(res.flat());
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  console.log("Validate:false");
                  resolve(console.log(res.flat()));
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("There is no md files.");
        }
      }
    }
  });
};
