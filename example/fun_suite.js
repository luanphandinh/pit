const fs = require("fs");
const t = fs.readFileSync("t.js", "utf8");

const { describe, before, test, log } = eval(t)(true);
const { extract } = require("../extract");

const d = describe("Suite name", "Here go the suite description", () => {
  before("200", () => {
    console.log("This will be called before sending request");
  });

  test("200", "Test 200 description", () => {
    pm.response.to.have.status(200);
  });

  before("403", () => {
    console.log("This should call when init");
  });

  test("403", "This test will be failed because return still 200", () => {
    pm.response.to.have.status(403);
  });
});

console.log(JSON.stringify(extract(t, d), null, 4));
