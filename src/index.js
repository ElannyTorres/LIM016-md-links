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
      //? Total - Unique
      const total = res.map((res) => res.href);
      const unique = new Set(total);
      console.log(`Total: ${total.length}\nUnique: ${unique.size}`);
    })
    .catch((err) => console.error(err));
};
export const optionValAndStats = (path) => {
  mdlinks(path, { validate: true })
    .then((res) => {
      //? Total - Unique - Broken
      const total = res.map((res) => res.href);
      const unique = new Set(total);
      const brokenArray = res.map((res) => res.message);
      const broken = brokenArray.filter((link) => link === "FAIL");
      console.log(
        `Total: ${total.length}\nUnique: ${unique.size}\nBroken: ${broken.length}`
      );
    })
    .catch((err) => console.error(err));
};
