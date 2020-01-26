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

const isArrayComparasion = (expected, actual) => {
  return Array.isArray(expected) && Array.isArray(actual);
};

const isObjectComparation = (expected, actual) => {
  return typeof expected === "object" && typeof actual === "object";
};

const Equal = (expected, actual) => {
  if (expected === actual) {
    return true;
  }

  if (isArrayComparasion(expected, actual)) {
    return ArrayEqual(expected, actual);
  }

  if (isObjectComparation(expected, actual)) {
    return ObjectEqual(expected, actual);
  }

  failed(expected, actual);
};

const ArrayEqual = (expected, actual) => {
  if (expected.length !== actual.length) failed(expected, actual);
  for (let i = 0; i < expected.length; i++) {
    Equal(expected[i], actual[i]);
  }

  return true;
};

const ObjectEqual = (expected, actual) => {
  const keys = Object.keys(expected);
  const actualKeys = Object.keys(actual);
  if (keys.length !== actualKeys.length) {
    failed(keys, actualKeys);
  }

  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    Equal(expected[key], actual[key]);
  }
};

module.exports = {
  Equal: Equal,
  ObjectEqual: ObjectEqual,
  ArrayEqual: ArrayEqual
};
