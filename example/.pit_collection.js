const path = require("path");

module.exports = {
  name: "Example Fun Postman",
  suites: {
    includes: ["Suite.js"],
    paths: [path.join(__dirname)]
  }
};
