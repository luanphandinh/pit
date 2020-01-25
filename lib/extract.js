const fs = require("fs");
const fsLib = require("./fs");
const path = require("path");

const t = fs
  .readFileSync(path.join(__dirname, "t.js"), "utf8")
  .replace("module.exports = ", "");

const defaultConfig = {
  suites: {
    includes: ["_suite"],
    paths: ["./"]
  }
};

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

  fsLib.findFiles(folder).forEach(file => {
    if (file.match(pattern)) {
      suites.push(require(file));
    }
  });

  return suites;
};

const extractSuite = suite => {
  const { name, description, callback, request } = suite;

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

  return item;

  // const pmSuite = {
  // name: name,
  // item: []
  // };
  // pmSuite.item.push(item);
  // return pmSuite;
};

const extractSuites = (paths, includes) => {
  const folder = paths[0];
  const pattern = includes[0];
  return sortSuites(getSuites(folder, pattern));
};

const ExtractCollection = description => {
  const { info, suites } = description;

  const collection = {
    info,
    item: [],
    variable: [
      {
        key: "t",
        value: t
      }
    ]
  };

  const { paths, includes } = suites;
  extractSuites(paths, includes).map(suite =>
    collection.item.push(extractSuite(suite))
  );

  return collection;
};

module.exports = {
  extractCollection: ExtractCollection
};
