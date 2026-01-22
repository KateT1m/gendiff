import { test, expect } from "@jest/globals";
import formatStylish from "../../src/formatters/stylish";

test("stylish formatter correctly formats diff tree to stylish format", () => {
  const diffTree = [
    {
      key: "common",
      type: "nested",
      children: [
        {
          key: "setting1",
          type: "unchanged",
          value: "Value 1",
        },
        {
          key: "setting2",
          type: "updated",
          oldValue: 200,
          newValue: 300,
        },
        {
          key: "setting3",
          type: "removed",
          value: true,
        },
        {
          key: "setting4",
          type: "added",
          value: "new value",
        },
      ],
    },
    {
      key: "group1",
      type: "nested",
      children: [
        {
          key: "baz",
          type: "unchanged",
          value: "bas",
        },
        {
          key: "foo",
          type: "added",
          value: "bar",
        },
      ],
    },
    {
      key: "group2",
      type: "added",
      value: {
        newSetting: "added",
      },
    },
  ];

  const expectedStylish = `{
  common: {
      setting1: Value 1
    - setting2: 200
    + setting2: 300
    - setting3: true
    + setting4: new value
  }
  group1: {
      baz: bas
    + foo: bar
  }
+ group2: {
      newSetting: added
}
}`;

  const result = formatStylish(diffTree);
  expect(result).toBe(expectedStylish);
});
