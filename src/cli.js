#!/usr/bin/env node
// enlaza para que funcione las opciones del cli

import { argv } from "process";
import { banner, noOptions, noValidOptions, help } from "./messages.js";
import {
  optionValFalse,
  optionValTrue,
  optionStats,
  optionValAndStats,
} from "./index.js";

const path = argv[2];
// *There's no route nor options
if (argv.length === 2) {
  console.log(banner);
  console.log(noOptions);
}
// *There's no options
if (argv.length === 3 && argv[2] == "--help") {
  console.log(banner);
  console.log(help);
}
// *validate: false
if (argv.length === 3) {
  console.log(banner);
  optionValFalse(path);
} else if (argv.length === 4 && argv[3] === "--validate") {
  // *validate: true
  optionValTrue(path);
} else if (argv.length === 4 && argv[3] === "--stats") {
  // *stats
  console.log(banner);
  optionStats(path);
} else if (
  argv.length === 5 &&
  argv[3] === "--validate" &&
  argv[4] === "--stats"
) {
  // *validate and stats
  console.log(banner);
  optionValAndStats(path);
} else if (
  argv.length === 5 &&
  argv[3] === "--stats" &&
  argv[4] === "--validate"
) {
  // *validate and stats
  console.log(banner);
  optionValAndStats(path);
} else {
  // *other
  console.log(banner);
  console.log(noValidOptions);
}
