import fs from "fs";
import yaml from "js-yaml";
import path from "path";

export default function parseFile(filePath) {
  const absolutePath = path.resolve(filePath);
  const fileContent = fs.readFileSync(absolutePath, "utf-8");
  const ext = path.extname(absolutePath).toLowerCase();

  switch (ext) {
    case ".json":
      return JSON.parse(fileContent);
    case ".yml":
    case ".yaml":
      return yaml.load(fileContent);
    default:
      throw new Error(`Unsupported file format: ${ext}`);
  }
}
