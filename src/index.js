import parse from "./parser.js";
import buildDiff from "./buildDiff.js";
import formatJson from "./formatters/json.js";
import formatPlain from "./formatters/plain.js";
import formatStylish from "./formatters/stylish.js";

export default function gendiff(filepath1, filepath2, format = "stylish") {
  try {
    const data1 = parse(filepath1);
    const data2 = parse(filepath2);

    const diffTree = buildDiff(data1, data2);

    let formattedOutput;
    switch (format) {
      case "json":
        formattedOutput = formatJson(diffTree);
        break;
      case "plain":
        formattedOutput = formatPlain(diffTree);
        break;
      case "stylish":
        formattedOutput = formatStylish(diffTree);
        break;
      default:
        throw new Error(`Unsupported format: ${format}`);
    }

    console.log("Содержимое первого файла:");
    console.log(JSON.stringify(data1, null, 2));

    console.log("\nСодержимое второго файла:");
    console.log(JSON.stringify(data2, null, 2));

    console.log("\nПостроенное дерево различий:");
    console.log(formattedOutput);
    return `Различия между ${filepath1} и ${filepath2} в формате ${format} (пока заглушка)`;
  } catch (error) {
    console.error("Ошибка при сравнении файлов:", error.message);
    process.exit(1);
  }
}
