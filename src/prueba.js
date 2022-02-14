import { getLinks } from "./api.js";

const path = "README.md";
getLinks(path)
  .then((res) => console.log(res))
  .catch((err) => console.log(err));
