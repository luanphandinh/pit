const { extractCollection } = require("../lib/extract");
const path = require("path");

const collection = extractCollection({
  info: {
    name: "Example Fun Postman",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  suites: {
    includes: ["_suite"],
    paths: [path.join(__dirname)]
  }
});

console.log(JSON.stringify(collection, null, 4));
