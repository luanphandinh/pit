const { describe, test } = require("../../../lib/t")(true);

module.exports = describe("Nested suite", "", () => {
  test("401", "description");
});
