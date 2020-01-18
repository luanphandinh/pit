const { extractCollection } = require("../lib/extract");
const path = require("path");

const collection = extractCollection(path.join(__dirname));
console.log(JSON.stringify(collection, null, 4));
