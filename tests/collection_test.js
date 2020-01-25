const { extractCollection } = require("../lib/collection");
const assert = require("./assert");
const path = require("path");

const collection = extractCollection({
  info: {
    name: "Example Fun Postman",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  suites: {
    includes: ["_suite"],
    paths: [path.join(__dirname, "suites")]
  }
});

const funSuiteItem = {
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
        exec: ['const { runTest } = eval(pm.variables.get("t"))();\nrunTest();']
      }
    },
    {
      listen: "prerequest",
      script: {
        exec: [
          'const { describe, before, test, sendRequest, dependOn } = eval(pm.variables.get("t"))();\n',
          'describe("Suite name", "Here go the suite description", () => {\n  sendRequest({\n    method: "GET",\n    url: {\n      raw: "https://request_something"\n    }\n  });\n\n  dependOn("Have dependencies suite");\n\n  before("200", () => {});\n\n  test("200", "Test 200 description", () => {});\n\n  before("404", () => {});\n\n  test("404", "Test 404", () => {});\n});'
        ]
      }
    }
  ]
};

const haveDependenciesSuite = {
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
        exec: ['const { runTest } = eval(pm.variables.get("t"))();\nrunTest();']
      }
    },
    {
      listen: "prerequest",
      script: {
        exec: [
          'const { describe, before, test, sendRequest, dependOn } = eval(pm.variables.get("t"))();\n',
          'describe("Have dependencies suite", "", () => {\n  test("401", "Test 401 description");\n});'
        ]
      }
    }
  ]
};

const nestedSuite1 = {
  name: "Nested suite",
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
        exec: ['const { runTest } = eval(pm.variables.get("t"))();\nrunTest();']
      }
    },
    {
      listen: "prerequest",
      script: {
        exec: [
          'const { describe, before, test, sendRequest, dependOn } = eval(pm.variables.get("t"))();\n',
          'describe("Nested suite", "", () => {\n  test("401", "description");\n});'
        ]
      }
    }
  ]
};

const nestedSuite2 = {
  name: "Nested 2 suite",
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
        exec: ['const { runTest } = eval(pm.variables.get("t"))();\nrunTest();']
      }
    },
    {
      listen: "prerequest",
      script: {
        exec: [
          'const { describe, before, test, sendRequest, dependOn } = eval(pm.variables.get("t"))();\n',
          'describe("Nested 2 suite", "", () => {\n  test("422", "description");\n});'
        ]
      }
    }
  ]
};

const nestedSuites = {
  name: "Nested Suite",
  item: [nestedSuite2, nestedSuite1]
};

assert.Equal(
  JSON.stringify([nestedSuites, funSuiteItem, haveDependenciesSuite]),
  JSON.stringify(collection.item)
);
