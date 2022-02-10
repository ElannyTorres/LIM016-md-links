import {
  pathExist,
  pathAbsolute,
  isDirectory,
  isFile,
  openDir,
  mdFiles,
  getLinks,
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
  it("pathExist should return false if the path exists", () => {
    expect(pathExist("./testFoder")).toBe(false);
  });
});

describe("pathAbsolute", () => {
  it("pathAbsolute should be a function", () => {
    expect(typeof pathAbsolute).toBe("function");
  });
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
  it("isDirectory should be a function", () => {
    expect(typeof isDirectory).toBe("function");
  });
  it("isDirectory should return true if the path is a directory.", () => {
    expect(isDirectory("./testFolder")).toEqual(true);
  });
  it("isDirectory should return false if the path is not a directory.", () => {
    expect(isDirectory("./testFolder/fileToRead1.md")).toEqual(false);
  });
});

describe("isFile", () => {
  it("isFile should be a function", () => {
    expect(typeof isFile).toBe("function");
  });
  it("isFile should return true if the path is a File.", () => {
    expect(isFile("./testFolder/fileToRead1.md")).toEqual(true);
  });
  it("isFile should return false if the path is not a File.", () => {
    expect(isFile("./testFolder")).toEqual(false);
  });
});

describe("openDir", () => {
  it("openDir should be a function", () => {
    expect(typeof openDir).toBe("function");
  });
  it("openDir should return an array of mdFiles", () => {
    expect(openDir("./testFolder")).toStrictEqual(arrayMDFiles);
  });
});

describe("mdFiles", () => {
  it("mdFiles should be a function", () => {
    expect(typeof mdFiles).toBe("function");
  });
  it("mdFiles should return an array of md files", () => {
    expect(mdFiles(arrayToTestMDFile)).toStrictEqual(arrayMDFiles);
  });
});

describe("getLinks", () => {
  it("getLinks shoulb be a function", () => {
    expect(typeof getLinks).toBe("function");
  });
  it("getLinks shoulb return an array of links for each file", () => {
    console.log(getLinks(arrayMDFiles));
    expect(getLinks(arrayMDFiles).then((res) => res)).toStrictEqual(arrayTest);
  });
});
