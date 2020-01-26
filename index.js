const { describe, test, sendRequest, before, dependOn } = require("./lib/t")(
  true
);

module.exports = {
  describe,
  test,
  sendRequest,
  before,
  dependOn
};
