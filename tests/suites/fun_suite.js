const { describe, before, test, runTest } = require("../../lib/t")(true);
const assert = require("../assert");

module.exports = describe("Suite name", "Here go the suite description", () => {
  before("200", () => {});

  test("200", "Test 200 description", () => {});

  before("404", () => {});

  test("404", "Test 404", () => {});
});

