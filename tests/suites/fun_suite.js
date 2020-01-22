const {
  describe,
  before,
  test,
  dependOn,
  sendRequest
} = require("../../lib/t")(true);

module.exports = describe("Suite name", "Here go the suite description", () => {
  sendRequest({
    method: "GET",
    url: {
      raw: "https://request_something"
    }
  });

  dependOn("Have dependencies suite");

  before("200", () => {});

  test("200", "Test 200 description", () => {});

  before("404", () => {});

  test("404", "Test 404", () => {});
});

