const { describe, test, sendRequest, before, dependOn } = require("./lib/t")(
  true
);
const extract = require("./lib/extract");

module.exports = {
  describe,
  test,
  sendRequest,
  before,
  dependOn,
  extract
};
