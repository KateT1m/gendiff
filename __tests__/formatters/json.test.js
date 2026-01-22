import { test, expect } from "@jest/globals";
import formatJson from "../../src/formatters/json.js";

test("json formatter correctly formats diff tree to JSON string", () => {
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
      ],
    },
  ];
  const expectedJson = `[
  {
    "key": "common",
    "type": "nested",
    "children": [
      {
        "key": "setting1",
        "type": "unchanged",
        "value": "Value 1"
      },
      {
        "key": "setting2",
        "type": "updated",
        "oldValue": 200,
        "newValue": 300
      }
    ]
  },
  {
    "key": "group1",
    "type": "nested",
    "children": [
      {
        "key": "baz",
        "type": "unchanged",
        "value": "bas"
      }
    ]
  }
]`;
  expect(formatJson(diffTree)).toBe(expectedJson);
});
