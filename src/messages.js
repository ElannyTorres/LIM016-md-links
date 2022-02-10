import chalk from "chalk";
import figlet from "figlet";

//banner
export const banner = chalk.blue.bold(
  figlet.textSync("md - links", {
    font: "Rectangles", //Bubble Fuzzy Rectangles Chunky Crazy Cybermedium
    horizontalLayout: "default",
    verticalLayout: "default",
    width: 100,
    whitespaceBreak: true,
  })
);

//messages
export const noOptions = chalk.inverse.redBright(
  "⚠️ More information is needed.\nIf you want to see the list of available options, use 'md-links --help'."
);
export const noValidOptions = chalk.inverse.redBright(
  "⚠️ There is no a valid option.\nIf you want to see the list of available options, use 'md-links --help'."
);
export const help = chalk.yellow(`
=================================================================================================================
Usage: md-links <path-to-file> [options]\n
If there's no options:
=> Returns href, text, file.\n
Choose one of the following options, for more info:
--validate
=> Returns more advanced link information: href, text, file, status, ok/fail.\n
--stats
=> Returns the total number of links and unique links.\n
--validate --stats or --stats --validate
=> Returns the total number of links (total), unique links (unique) and broken links (broken).
=================================================================================================================
`);
