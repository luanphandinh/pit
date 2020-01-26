const process = require("process");
const fs = require("fs");
const { extractCollection } = require("./collection");

module.exports = () => {
  const pwd = process.cwd();
  const config = require(pwd + "/.pit_collection.js");
  const collection = extractCollection(config);
  fs.writeFile(
    pwd + "/test.postman_collection.json",
    JSON.stringify(collection, null, 4),
    null,
    () => null
  );
};
