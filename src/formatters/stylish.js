const formatStylish = (diffTree) => {
  const indent = (depth) => "  ".repeat(depth * 2);

  const formatValue = (value, depth) => {
    if (typeof value === "object" && value !== null) {
      const entries = Object.entries(value);
      const lines = entries.map(
        ([key, val]) =>
          `${indent(depth + 1)}  ${key}: ${formatValue(val, depth + 1)}`,
      );
      return `{\n${lines.join("\n")}\n${indent(depth)}}`;
    }
    return String(value);
  };

  const iter = (nodes, depth) => {
    const lines = nodes.map((node) => {
      switch (node.type) {
        case "added":
          return `${indent(depth)}+ ${node.key}: ${formatValue(node.value, depth)}`;
        case "removed":
          return `${indent(depth)}- ${node.key}: ${formatValue(node.value, depth)}`;
        case "updated":
          return [
            `${indent(depth)}- ${node.key}: ${formatValue(node.oldValue, depth)}`,
            `${indent(depth)}+ ${node.key}: ${formatValue(node.newValue, depth)}`,
          ].join("\n");
        case "nested":
          return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1)}\n${indent(depth)}  }`;
        case "unchanged":
          return `${indent(depth)}  ${node.key}: ${formatValue(node.value, depth)}`;
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
    return lines.join("\n");
  };

  return `{\n${iter(diffTree, 0)}\n}`;
};

export default formatStylish;
