const extract = describer => {
  const { suite, tests, schedule } = describer;
  const pmSuite = {
    name: suite.name,
    item: []
  };

  for (const name of schedule) {
    const item = {
      name: name,
      event: [
        {
          listen: "test",
          script: {
            exec: ['const { runTest } = pm.variables.get("t"); runTest()']
          }
        },
        {
          listen: "prerequest",
          script: {
            exec: [
              'const { describe, before, test } = pm.variables.get("t");\n',
              `describe("${suite.name}", "${suite.description}", ${suite.callback});`
            ]
          }
        }
      ]
    };

    pmSuite.item.push(item);
  }

  const collection = {
    info: {
      _postman_id: "11fe7fe3-b6d1-453f-adbc-af5463bf9d5c",
      name: "Example Fun Postman",
      schema:
        "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    item: [pmSuite]
  };

  return collection;
};

module.exports = {
  extract: extract
};
