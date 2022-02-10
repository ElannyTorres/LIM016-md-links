import { pathExist, getStatusLinks } from "../src/api.js";

const arrayTest = [
  {
    href: "https://psicologiaymente.com/",
    text: "enlaceCorrecto",
    file: "/home/laboratoria/Luz/LIM016-md-links/testFolder/Folder/fileToRead2.md",
  },
  {
    href: "https://www.lego.com/en-us/notfound",
    text: "enlace no encontrado",
    file: "/home/laboratoria/Luz/LIM",
  },
  {
    href: "https://psicologiaymente.co/",
    text: "enlaceIncorrecto",
    file: "/home/laboratoria/Luz/LIM016-md-links/testFolder/Folder/fileToRead2.md",
  },
  {
    href: "https://developer.mozilla.org/es/docs/Web/HTTP/Status",
    text: "Estados de respuesta HTTP",
    file: "/home/laboratoria/Luz/LIM016-md-links/testFolder/Folder/fileToRead2.md",
  },
];
const arrayStatus = [
  {
    href: "https://psicologiaymente.com/",
    text: "enlaceCorrecto",
    file: "/home/laboratoria/Luz/LIM016-md-links/testFolder/Folder/fileToRead2.md",
    status: 200,
    message: "OK",
  },
  {
    href: "https://www.lego.com/en-us/notfound",
    text: "enlace no encontrado",
    file: "/home/laboratoria/Luz/LIM",
    status: 404,
    message: "FAIL",
  },
  {
    href: "https://psicologiaymente.co/",
    text: "enlaceIncorrecto",
    file: "/home/laboratoria/Luz/LIM016-md-links/testFolder/Folder/fileToRead2.md",
    status: 200,
    message: "OK",
  },
  {
    href: "https://developer.mozilla.org/es/docs/Web/HTTP/Status",
    text: "Estados de respuesta HTTP",
    file: "/home/laboratoria/Luz/LIM016-md-links/testFolder/Folder/fileToRead2.md",
    status: 200,
    message: "OK",
  },
];

describe("pathExist", () => {
  it("pathExist should be a function", () => {
    expect(typeof pathExist).toBe("function");
  });
  it("pathExist should return true if the path exists", () => {
    expect(pathExist("./testFolder")).toBe(true);
  });
  it("pathExist should return true if the path exists", () => {
    expect(pathExist("./testFoder")).toBe(false);
  });
});

describe("getStatusLinks", () => {
  it("getStatusLinks should be a function", () => {
    expect(typeof getStatusLinks).toBe("function");
  });
  it("getStatusLinks should return an array of the status of each link", () => {
    console.log(getStatusLinks(arrayTest));
    expect(getStatusLinks(arrayTest)).toEqual(arrayStatus);
  });
});
