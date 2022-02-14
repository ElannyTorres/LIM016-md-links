import {
  pathExist,
  pathAbsolute,
  isDirectory,
  isFile,
  openDir,
  mdFiles,
  getLinks,
  getStatusLinks,
} from "../src/api.js";

const arrayToTestMDFile = [
  "./testFolder/Folder/fileToRead2.txt",
  "./testFolder/Folder/fileToRead2.md",
  "./testFolder/emptyFile.md",
  "./testFolder/emptyFile.txt",
  "./testFolder/fileToRead1.md",
];
const arrayMDFiles = [
  "./testFolder/Folder/fileToRead2.md",
  "./testFolder/emptyFile.md",
  "./testFolder/fileToRead1.md",
];
const arrayToTest = [
  "./testFolder/Folder/fileToRead2.md",
  "./testFolder/emptyFile.md",
];
const arrayTest = [
  {
    href: "https://psicologiaymente.com/",
    text: "enlaceCorrecto",
    file: "./testFolder/Folder/fileToRead2.md",
  },
  {
    href: "https://www.lego.com/en-us/notfound",
    text: "Lego not Found",
    file: "./testFolder/Folder/fileToRead2.md",
  },
  {
    href: "https://developer.mozilla.org/es/docs/Web/HTTP/Status",
    text: "Estados de respuesta HTTP",
    file: "./testFolder/Folder/fileToRead2.md",
  },
  {
    href: "https://www.kualo.co.uk/404",
    text: "Kualo 404",
    file: "./testFolder/Folder/fileToRead2.md",
  },
];
const arrayStatus = [
  {
    href: "https://psicologiaymente.com/",
    text: "enlaceCorrecto",
    file: "./testFolder/Folder/fileToRead2.md",
    status: 200,
    message: "OK",
  },
  {
    href: "https://www.lego.com/en-us/notfound",
    text: "Lego not Found",
    file: "./testFolder/Folder/fileToRead2.md",
    status: 404,
    message: "FAIL",
  },
  {
    href: "https://developer.mozilla.org/es/docs/Web/HTTP/Status",
    text: "Estados de respuesta HTTP",
    file: "./testFolder/Folder/fileToRead2.md",
    status: 200,
    message: "OK",
  },
  {
    href: "https://www.kualo.co.uk/404",
    text: "Kualo 404",
    file: "./testFolder/Folder/fileToRead2.md",
    status: 404,
    message: "FAIL",
  },
];

describe("pathExist", () => {
  it("pathExist should return true if the path exists", () => {
    expect(pathExist("./testFolder")).toBe(true);
  });
  it("pathExist should return false if the path exists", () => {
    expect(pathExist("./testFoder")).toBe(false);
  });
});

describe("pathAbsolute", () => {
  it("pathAbsolute should return the absolute path of a relative path", () => {
    expect(pathAbsolute("./testFolder")).toEqual(
      "/home/laboratoria/Luz/LIM016-md-links/testFolder"
    );
  });
  it("pathAbsolute should return the same path of a absolute path", () => {
    expect(
      pathAbsolute("/home/laboratoria/Luz/LIM016-md-links/testFolder")
    ).toEqual("/home/laboratoria/Luz/LIM016-md-links/testFolder");
  });
});

describe("isDirectory", () => {
  it("isDirectory should return true if the path is a directory.", () => {
    expect(isDirectory("./testFolder")).toEqual(true);
  });
  it("isDirectory should return false if the path is not a directory.", () => {
    expect(isDirectory("./testFolder/fileToRead1.md")).toEqual(false);
  });
});

describe("isFile", () => {
  it("isFile should return true if the path is a File.", () => {
    expect(isFile("./testFolder/fileToRead1.md")).toEqual(true);
  });
  it("isFile should return false if the path is not a File.", () => {
    expect(isFile("./testFolder")).toEqual(false);
  });
});

describe("openDir", () => {
  it("openDir should return an array of mdFiles", () => {
    expect(openDir("./testFolder")).toStrictEqual(arrayMDFiles);
  });
});

describe("mdFiles", () => {
  it("mdFiles should return an array of md files", () => {
    expect(mdFiles(arrayToTestMDFile)).toStrictEqual(arrayMDFiles);
  });
});

describe("getLinks", () => {
  it("getLinks shoulb return an array of links for each file", () => {
    return getLinks(arrayToTest).then((res) =>
      expect(res.flat()).toStrictEqual(arrayTest)
    );
  });
});

describe("getStatusLinks", () => {
  it("getStatusLinks should return an array of links for each file.", () => {
    return getStatusLinks(arrayTest).then((res) =>
      expect(res).toStrictEqual(arrayStatus)
    );
  });
});
// Test de integración con mdlinks
