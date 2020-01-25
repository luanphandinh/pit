const verbose = (expected, actual) => {
  console.log("expected[+] / actual[-]");
  console.log("+");
  console.log(expected);
  console.log("-");
  console.log(actual);
};

const failed = (expected, actual) => {
  verbose(expected, actual);
  process.exit(1);
};

const Equal = (expected, actual) => {
  if (expected === actual) {
    return true;
  }
  verbose(expected, actual);
  process.exit(1);
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
