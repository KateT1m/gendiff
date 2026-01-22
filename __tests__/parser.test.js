import { test, expect } from "@jest/globals";
import { fileURLToPath } from "url";
import path from "path";
import parseFile from "../src/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const getFixturePath = (filename) =>
  path.join(__dirname, "..", "__fixtures__", filename);

test("parseFile correctly parses JSON file", () => {
  const data = parseFile(getFixturePath("before.json"));
  expect(data).toEqual({
    common: {
      setting1: "Value 1",
      setting2: 200,
      setting3: true,
    },
    group1: { baz: "bas" },
  });
});

test("parseFile correctly parses YAML file", () => {
  const data = parseFile(getFixturePath("before.yml"));
  expect(data).toEqual({
    common: {
      setting1: "Value 1",
      setting2: 200,
      setting3: true,
    },
    group1: { baz: "bas" },
  });
});

test("parseFile throws error for unsupported file format", () => {
  expect(() => {
    parseFile(getFixturePath("unsupported.txt"));
  }).toThrow("Unsupported file format: .txt");
});
