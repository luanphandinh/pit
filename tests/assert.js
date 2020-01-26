const verbose = (expected, actual) => {
  console.log("\033[0;32mexpected[+]\033[0m / \033[0;31mactual[-]\033[0m");
  console.log("\033[0;32m+");
  console.log(expected);
  console.log("\033[0m");
  console.log("\033[0;31m-");
  console.log(actual);
  console.log("\033[0m");
};

const failed = (expected, actual) => {
  verbose(expected, actual);
  throw new Error("failed!");
};

const Equal = (expected, actual) => {
  if (expected === actual) {
    return true;
  }
  failed(expected, actual);
};

const ArrayEqual = (expected, actual) => {
  if (expected.length !== actual.length) failed(expected, actual);
  expected.map((val, index) => {
    if (Array.isArray(val)) {
      ArrayEqual(val, actual[index]);
    } else if (val !== actual[index]) {
      failed(expected, actual);
    }

    return true;
  });
};

module.exports = {
  Equal: Equal,
  ArrayEqual: ArrayEqual
};
