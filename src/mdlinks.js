import { getStatusLinks } from "./api.js";

/* openDir("/home/laboratoria/Luz/LIM016-md-links/testFolder");

getLinks("/home/laboratoria/Luz/LIM016-md-links/testFolder/fileToRead1.md")
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
getLinks(
  "/home/laboratoria/Luz/LIM016-md-links/testFolder/Folder/fileToRead2.md"
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  }); */

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

getStatusLinks(arrayTest)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
