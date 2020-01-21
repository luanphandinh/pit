const { extractCollection } = require("../lib/extract");
const assert = require("./assert");
const path = require("path");

const collection = extractCollection(path.join(__dirname, "suites"));

const funSuiteItem = {
  name: "Suite name",
  item: [
    {
      name: "Suite name",
      request: {
        method: "GET",
        header: [],
        url: {
          raw: "https://request_something"
        }
      },
      event: [
        {
          listen: "test",
          script: {
            exec: [
              'const { runTest } = eval(pm.variables.get("t"))();\nrunTest();'
            ]
          }
        },
        {
          listen: "prerequest",
          script: {
            exec: [
              'const { describe, before, test, sendRequest } = eval(pm.variables.get("t"))();\n',
              'describe("Suite name", "Here go the suite description", () => {\n  sendRequest({\n    method: "GET",\n    url: {\n      raw: "https://request_something"\n    }\n  });\n\n  dependOn("Have dependencies suite");\n\n  before("200", () => {});\n\n  test("200", "Test 200 description", () => {});\n\n  before("404", () => {});\n\n  test("404", "Test 404", () => {});\n});'
            ]
          }
        }
      ]
    }
  ]
};

const haveDependenciesSuite = {
  name: "Have dependencies suite",
  item: [
    {
      name: "Have dependencies suite",
      request: {
        method: "GET",
        header: [],
        url: {
          raw: "{{request_url}}",
          host: ["{{request_url}}"]
        }
      },
      event: [
        {
          listen: "test",
          script: {
            exec: [
              'const { runTest } = eval(pm.variables.get("t"))();\nrunTest();'
            ]
          }
        },
        {
          listen: "prerequest",
          script: {
            exec: [
              'const { describe, before, test, sendRequest } = eval(pm.variables.get("t"))();\n',
              'describe("Have dependencies suite", "", () => {\n  test("401", "Test 401 description");\n});'
            ]
          }
        }
      ]
    }
  ]
};

assert.Equal(
  JSON.stringify([funSuiteItem, haveDependenciesSuite]),
  JSON.stringify(collection.item)
);
