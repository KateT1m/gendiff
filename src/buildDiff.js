import lodash from "lodash";

export default function buildDiff(obj1, obj2) {
  const allKeys = lodash.union(Object.keys(obj1), Object.keys(obj2));
  const keys = lodash.sortBy(allKeys);
  return keys.map((key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: "added", value: value2 };
    }
    if (!Object.hasOwn(obj2, key)) {
      return { key, type: "removed", value: value1 };
    }
    if (lodash.isPlainObject(value1) && lodash.isPlainObject(value2)) {
      return { key, type: "nested", children: buildDiff(value1, value2) };
    }
    if (!lodash.isEqual(value1, value2)) {
      return {
        key,
        type: "updated",
        oldValue: value1,
        newValue: value2,
      };
    }
    return { key, type: "unchanged", value: value1 };
  });
}
