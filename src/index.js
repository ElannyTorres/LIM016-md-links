// import { chalk } from "chalk";
import { mdlinks } from "./mdlinks.js";

export const optionValFalse = (path) => {
  mdlinks(path, { value: false })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};
export const optionValTrue = (path) => {
  mdlinks(path, { value: true })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};
export const optionStats = (path) => {
  mdlinks(path, { value: true })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};
export const optionValAndStats = (path) => {
  mdlinks(path, { value: true })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => console.error(err));
};
