const formatPlain = (diffTree) => {
  const iter = (nodes, path) => {
    return nodes.flatMap((node) => {
      const propertyPath = path ? `${path}.${node.key}` : node.key;

      switch (node.type) {
        case "added":
          return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;
        case "removed":
          return `Property '${propertyPath}' was removed`;
        case "updated":
          return `Property '${propertyPath}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
        case "nested":
          return iter(node.children, propertyPath);
        case "unchanged":
          return [];
        default:
          throw new Error(`Unknown node type: ${node.type}`);
      }
    });
  };

  const formatValue = (value) => {
    if (typeof value === "string") {
      return `'${value}'`;
    }
    if (typeof value === "object" && value !== null) {
      return "[complex value]";
    }
    return value;
  };

  return iter(diffTree, "").join("\n");
};

export default formatPlain;
