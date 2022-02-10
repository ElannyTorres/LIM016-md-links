// import { chalk } from "chalk";
import { mdlinks } from "./mdlinks.js";

export const optionValFalse = (path) => {
  mdlinks(path, { validate: false })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};
export const optionValTrue = (path) => {
  mdlinks(path, { validate: true })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};
export const optionStats = (path) => {
  mdlinks(path, { validate: true })
    .then((res) => {
      console.log(res);
      //? Total - Unique
    })
    .catch((err) => console.error(err));
};
export const optionValAndStats = (path) => {
  mdlinks(path, { validate: true })
    .then((res) => {
      console.log(res);
      //? Total - Unique - Broken
    })
    .catch((err) => console.error(err));
};
