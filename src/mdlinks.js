import chalk from "chalk";
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
      reject(
        console.log(chalk.redBright.inverse("The enteredPath does not exist"))
      );
    }
    /* if(!isFile(path) || !isDirectory(path)) {
      reject(console.log("The enteredPath is not a file nor a directory, please enter a directory or a file."))
    } */
    if (pathExist(path)) {
      const absolutePath = pathAbsolute(path);
      let fileArray = [];
      // *First file
      if (isFile(path)) {
        fileArray.push(absolutePath);
        console.log(fileArray);
        if (mdFiles(fileArray)) {
          getLinks(fileArray)
            .then((res) => {
              res.flat();
            })
            .catch((err) => console.log(err));
        } else {
          reject(
            console.log(
              chalk.redBright.inverse("The enteredPath is not a md file.")
            )
          );
        }
      } else if (isDirectory(path)) {
        fileArray.push(openDir(absolutePath));
        const flatFileArray = fileArray.flat();
        if (flatFileArray.length > 0) {
          getLinks(flatFileArray)
            .then((res) => {
              if (res.length === 0) {
                console.log(
                  chalk.redBright.inverse("There is no links in the path.")
                );
              } else {
                if (options.validate) {
                  getStatusLinks(res.flat())
                    .then((res) => {
                      resolve(res.flat());
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else {
                  resolve(res.flat());
                }
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log(chalk.redBright.inverse("There is no md files."));
        }
      }
    }
  });
};
