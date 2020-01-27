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

const extractSuite = file => {
  const suite = require(file);
  const suiteName = path.basename(file, ".js");
  const { name, callback, request } = suite;

  let item = {
    name: suiteName,
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
            `describe("${suiteName}", ${callback});`
          ]
        }
      }
    ]
  };

  return item;
};

const extractSuites = (paths, includes) => {
  const src = paths[0];
  let pattern = includes[0];

  if (pattern === "") {
    pattern = "_suite";
  }

  const filesTree = fsLib.getFilesTree(src, 10, {
    fullPath: true
  });

  return combineSuitesTreeFromFilesTree(filesTree.slice(1), pattern);
};

const combineSuitesTreeFromFilesTree = (filesTree, pattern) => {
  const items = [];

  filesTree.map(fileOrTree => {
    if (typeof fileOrTree === "string" && fileOrTree.match(pattern)) {
      items.push(extractSuite(fileOrTree));
    }

    if (Array.isArray(fileOrTree)) {
      const tree = combineSuitesTreeFromFilesTree(fileOrTree.slice(1), pattern);
      if (tree.length > 0) {
        items.push({
          name: path.basename(fileOrTree[0]),
          item: tree
        });
      }
    }
  });

  return items;
};

const ExtractCollection = description => {
  const { name, suites } = description;

  const collection = {
    info: {
      name,
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

  const { dirs, includes } = suites;
  collection.item = extractSuites(dirs, includes);

  return collection;
};

module.exports = {
  extractCollection: ExtractCollection
};
