const fs = require("fs");
const path = require("path");

const t = fs
  .readFileSync(path.join(__dirname, "t.js"), "utf8")
  .replace("module.exports = ", "");

const sortSuites = suites => {
  const weights = {};
  suites.forEach(suite => {
    const { name, dependencies } = suite;
    weights[name] = weights[name] ? weights[name] + 1 : 1;
    if (dependencies && dependencies.length > 0) {
      dependencies.forEach(depend => {
        weights[depend] = weights[depend] ? weights[depend] + 1 : 1;
      });
    }
  });

  suites.sort((suite1, suite2) => weights[suite2.name] - weights[suite1.name]);
  return suites;
};

const getSuites = (folder, pattern) => {
  const suites = [];
  if (!pattern) {
    pattern = "_suite";
  }

  fs.readdirSync(folder).forEach(file => {
    if (file.includes(pattern)) {
      suites.push(require(path.join(folder, file)));
    }
  });

  return suites;
};

const extract = suite => {
  const { name, description, callback, request } = suite;
  const pmSuite = {
    name: name,
    item: []
  };

  const item = {
    name: name,
    request: {
      method: "GET",
      header: [],
      url: {
        raw: "{{request_url}}",
        host: ["{{request_url}}"]
      },
      ...request
    },
    event: [
      {
        listen: "test",
        script: {
          exec: [
            'const { runTest } = eval(pm.variables.get("t"))();\nrunTest();'
          ]
        }
      },
      {
        listen: "prerequest",
        script: {
          exec: [
            'const { describe, before, test, sendRequest, dependOn } = eval(pm.variables.get("t"))();\n',
            `describe("${name}", "${description}", ${callback});`
          ]
        }
      }
    ]
  };

  pmSuite.item.push(item);
  return pmSuite;
};

const ExtractCollection = (folder, pattern) => {
  const suites = sortSuites(getSuites(folder, pattern));
  const collection = {
    info: {
      _postman_id: "11fe7fe3-b6d1-453f-adbc-af5463bf9d5c",
      name: "Example Fun Postman",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [],
    variable: [
      {
        key: "t",
        value: t
      }
    ]
  };

  suites.map(suite => collection.item.push(extract(suite)));

  return collection;
};

module.exports = {
  extractCollection: ExtractCollection
};
