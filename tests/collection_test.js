const { extractCollection } = require("../lib/collection");
const assert = require("./assert");
const path = require("path");

const collection = extractCollection({
  name: "Example Fun Postman",
  suites: {
    includes: ["_suite"],
    paths: [path.join(__dirname, "suites")]
  }
});

const funSuiteItem = {
  name: "fun_suite",
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
          'describe("Suite name", () => {\n  sendRequest({\n    method: "GET",\n    url: {\n      raw: "https://request_something"\n    }\n  });\n\n  dependOn("Have dependencies suite");\n\n  before("200", () => {});\n\n  test("200", "Test 200 description", () => {});\n\n  before("404", () => {});\n\n  test("404", "Test 404", () => {});\n});'
        ]
      }
    }
  ]
};

const haveDependenciesSuite = {
  name: "have_depend_suite",
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
          'describe("Have dependencies suite", () => {\n  test("401", "Test 401 description");\n});'
        ]
      }
    }
  ]
};

const nestedSuite1 = {
  name: "nested_suite",
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
          'describe("Nested suite", () => {\n  test("401", "description");\n});'
        ]
      }
    }
  ]
};

const nestedSuite2 = {
  name: "nested2_suite",
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
          'describe("Nested 2 suite", () => {\n  test("422", "description");\n});'
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
  [nestedSuites, funSuiteItem, haveDependenciesSuite],
  collection.item
);
