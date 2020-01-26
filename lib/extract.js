const process = require("process");
const fs = require("fs");
const { extractCollection } = require("./collection");

module.exports = () => {
  const pwd = process.cwd();
  const collection = extractCollection(require(pwd + "/.pit_collection.js"));
  fs.writeFile(
    pwd + "/tests/test.postman_collection.json",
    JSON.stringify(collection, null, 4),
    null,
    () => null
  );
}
