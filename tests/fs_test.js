const fs = require("../lib/fs");
const path = require("path");
const assert = require("./assert");

const expectedAllLevels = [
  path.resolve(__dirname, "fs_mock_files/1/2/a_suite.js"),
  path.resolve(__dirname, "fs_mock_files/1/a_suite.js"),
  path.resolve(__dirname, "fs_mock_files/a_suite.js"),
  path.resolve(__dirname, "fs_mock_files/b_suite.js")
];

const expected1Levels = [
  path.resolve(__dirname, "fs_mock_files/a_suite.js"),
  path.resolve(__dirname, "fs_mock_files/b_suite.js")
];

const expected2Levels = [
  path.resolve(__dirname, "fs_mock_files/1/a_suite.js"),
  path.resolve(__dirname, "fs_mock_files/a_suite.js"),
  path.resolve(__dirname, "fs_mock_files/b_suite.js")
];

assert.ArrayEqual(
  expectedAllLevels,
  fs.findFiles(path.join(__dirname, "fs_mock_files"))
);
assert.ArrayEqual(
  expected1Levels,
  fs.findFiles(path.join(__dirname, "fs_mock_files"), 1)
);
assert.ArrayEqual(
  expected2Levels,
  fs.findFiles(path.join(__dirname, "fs_mock_files"), 2)
);
