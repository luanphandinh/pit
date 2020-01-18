const fs = require("fs");
let t = fs.readFileSync("t.js", "utf8");
t = t.replace("module.exports = ", "");

const extract = describer => {
  const { suite, schedule } = describer;
  const pmSuite = {
    name: suite.name,
    item: []
  };

  const item = {
    name: suite.name,
    request: {
      method: "GET",
      header: [],
      url: {
        raw: "https://google.com",
        host: ["https://google.com"]
      }
    },
    event: [
      {
        listen: "test",
        script: {
          exec: ['const { runTest } = eval(pm.variables.get("t"))(); runTest()']
        }
      },
      {
        listen: "prerequest",
        script: {
          exec: [
            'const { describe, before, test } = eval(pm.variables.get("t"))();\n',
            `describe("${suite.name}", "${suite.description}", ${suite.callback});`
          ]
        }
      }
    ]
  };

  pmSuite.item.push(item);

  const collection = {
    info: {
      _postman_id: "11fe7fe3-b6d1-453f-adbc-af5463bf9d5c",
      name: "Example Fun Postman",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [pmSuite],
    variable: [
      {
        key: "t",
        value: t
      }
    ]
  };

  return collection;
};

module.exports = {
  extract: extract
};
