const { describe, before, test, sendRequest } = require("../../lib/t")(true);
const assert = require("../assert");

module.exports = describe("Suite name", "Here go the suite description", () => {
  sendRequest({
    method: "GET",
    url: {
      raw: "https://request_something"
    }
  });

  before("200", () => {});

  test("200", "Test 200 description", () => {});

  before("404", () => {});

  test("404", "Test 404", () => {});
});

