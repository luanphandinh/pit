const path = require("path");

module.exports = {
  name: "Example Fun Postman",
  suites: {
    includes: ["Suite.js"],
    dirs: [path.join(__dirname)]
  }
};
