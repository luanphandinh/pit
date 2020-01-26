const { describe, before, test, sendRequest } = require("pits");

module.exports = describe("Let's check spotify", () => {
  sendRequest({
    method: "GET",
    header: [],
    url: {
      raw: "{{spotify_api}}/{{version}}/{{endpoint}}",
      host: ["{{spotify_api}}/{{version}}"]
    }
  });

  before("401", () => {
    pm.variables.set("spotify_api", "https://api.spotify.com");
    pm.variables.set("version", "v1");
    pm.variables.set("endpoint", "tracks/2KrxsD86ARO5beq7Q0Drfqa");
  });

  test("401", "I don't have any key so....", () => {
    const jsonData = pm.response.json();
    pm.expect(jsonData.error.status).to.equal(401);
    pm.expect(jsonData.error.message).to.equal("No token provided");
  });
});

