const { describe, before, test } = require("../index");

module.exports = describe("Let's check google", () => {
  before("200", () => {
    console.log("This will be called before sending request");
    console.log("{{request_url}} is hard_code, will be more dynamic later");
    pm.variables.set("request_url", "https://google.com");
  });

  test("200", "Test 200 description", () => {
    pm.response.to.have.status(200);
  });

  before("404", () => {
    console.log("This should call when init");
    pm.variables.set("request_url", "https://google.com/404");
  });

  test("404", "Test 404", () => {
    pm.response.to.have.status(404);
  });
});
