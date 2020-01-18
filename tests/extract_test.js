const { getSuites } = require("../lib/extract");
const assert = require("./assert");

const path = require("path");
suites = getSuites(path.join(__dirname, "suites"));

const expected = {
  suite: {
    name: "Suite name",
    description: "Here go the suite description",
    callback:
      '() => {\n  before("200", () => {});\n\n  test("200", "Test 200 description", () => {});\n\n  before("404", () => {});\n\n  test("404", "Test 404", () => {});\n}'
  },
  tests: {
    "200": {
      before: "() => {}",
      name: "200",
      description: "Test 200 description",
      callback: "() => {}"
    },
    "404": {
      before: "() => {}",
      name: "404",
      description: "Test 404",
      callback: "() => {}"
    }
  },
  schedule: ["200", "404"],
  lock: true
};

assert.Equal(JSON.stringify([expected]), JSON.stringify(suites));