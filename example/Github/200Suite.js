const { describe, before, test } = require("../../index");

module.exports = describe("200", () => {
  before("200", () => {
    pm.variables.set(
      "request_url",
      "https://api.github.com/users/luanphandinh"
    );
  });

  test("200", "Should be able to get my information from github", () => {
    pm.response.to.have.status(200);
    const jsonData = pm.response.json();
    pm.expect(jsonData.name).to.equal("Luan Phan");
  });
});
