const verbose = (expected, actual) => {
  console.log("expected[+]/actual[-]");
  console.log("+");
  console.log(expected);
  console.log("-");
  console.log(actual);
};

const Equal = (expected, actual) => {
  if (expected === actual) {
    return true;
  }
  verbose(expected, actual);
  process.exit(1);
};

module.exports = {
  Equal: Equal
};
