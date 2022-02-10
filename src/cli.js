#!/usr/bin/env node
// enlaza para que funcione las opciones del cli

import { argv } from "process";
import { banner, noOptions, help } from "./messages.js";

// There's no route nor options
if (argv.length == 2) {
  console.log(banner);
  console.log(noOptions);
}
// There's no options
if (argv[2] == "--help") {
  console.log(banner);
  console.log(help);
}
