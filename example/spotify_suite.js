const { describe, before, test } = require("../lib/t")(true);

module.exports = describe("Let's check spotify", "Checking spotify api", () => {
  before("401", () => {
    pm.variables.set(
      "request_url",
      "https://api.spotify.com/v1/tracks/2KrxsD86ARO5beq7Q0Drfqa"
    );
  });

  test("401", "I don't have any key so....", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.error.status).to.equal(401);
    pm.expect(jsonData.error.message).to.equal("No token provided");
  });
});

