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
          script: []
        },
        {
          listen: "prescript",
          script: []
        }
      ]
    };

    pmSuite.item.push(item);
  }

  return pmSuite;
};

module.exports = {
  extract: extract
};
