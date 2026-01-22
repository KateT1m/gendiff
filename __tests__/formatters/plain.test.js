import { test, expect } from "@jest/globals";
import formatPlain from "../../src/formatters/plain.js";

test("plain formatter correctly formats diff tree to plain text", () => {
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

  const expectedPlainText = `Property 'common.setting2' was updated. From 200 to 300
Property 'common.setting3' was removed
Property 'common.setting4' was added with value: 'new value'
Property 'group1.foo' was added with value: 'bar'
Property 'group2' was added with value: [complex value]`;

  const result = formatPlain(diffTree);
  expect(result).toBe(expectedPlainText);
});
