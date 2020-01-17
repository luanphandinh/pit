const fs = require("fs");
const t = fs.readFileSync("t.js", "utf8");

const { mock, describe, before, test, log } = eval(t);
const { extract } = require("../extract");

mock();
const d = describe("Suite name", "Here go the suite description", () => {
  before("200", () => {
    log("This should call when init");
  });

  test("200", "Test 200 description", () => {
    log("This test is OK");
  });

  before("403", () => {
    log("This should call when init");
  });

  test("403", "Test 403 description", () => {
    log("This test is not quite OK");
  });
});

console.log(JSON.stringify(extract(d), null, 4));
