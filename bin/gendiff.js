import { Command } from "commander";

import gendiff from "../src/index.js";

const program = new Command();

program
  .name("gendiff")
  .description("Compares two files and shows differences.")
  .version("1.0.0")
  .argument("<filepath1>", "path to the first file")
  .argument("<filepath2>", "path to the second file")
  .option(
    "-f, --format <type>",
    "формат вывода (stylish, plain, json)",
    "stylish",
  )
  .action((filepath1, filepath2, options) => {
    const format = options.format;
    const result = gendiff(filepath1, filepath2, format);
    console.log(result);
  });

program.parse();
