import { argv } from "process";
import {
  pathExist,
  pathAbsolute,
  isDirectory,
  isFile,
  openDir,
  getLinks,
  getStatusLinks,
} from "./api.js";
import { noOptions } from "./messages.js";

argv.forEach((val, index) => {
  console.log(`${index}: ${val}`); // show the path and options
});
const path = argv[2];
console.log(path);
if (argv.length < 4) {
  console.log(noOptions);
}

console.log(pathExist(path));
console.log(pathAbsolute(path));
console.log(isDirectory(path));
console.log(isFile(path));
const pathArray = openDir(path);
console.log(pathArray);
getLinks(pathArray)
  .then((res) => {
    const respuesta = res.flat(Infinity);
    console.log(respuesta);
    return getStatusLinks(respuesta);
  })
  .then((re) => {
    console.log(re);
  })
  .catch((err) => {
    console.log(err);
  });
