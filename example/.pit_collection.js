const path = require("path");

module.exports = {
  info: {
    name: "Example Fun Postman",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  suites: {
    includes: ["Suite.js"],
    paths: [path.join(__dirname)]
  }
};
