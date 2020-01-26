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

assert.Equal(
  expectedAllLevels,
  fs.findFiles(path.join(__dirname, "fs_mock_files"))
);
assert.Equal(
  expected1Levels,
  fs.findFiles(path.join(__dirname, "fs_mock_files"), 1)
);
assert.Equal(
  expected2Levels,
  fs.findFiles(path.join(__dirname, "fs_mock_files"), 2)
);

const treeFiles = [
  "fs_mock_files",
  ["1", ["2", "a_suite.js"], "a_suite.js"],
  "a_suite.js",
  "b_suite.js"
];

assert.Equal(treeFiles, fs.getFilesTree(path.join(__dirname, "fs_mock_files")));

const treeFilesFullDirPath = [
  path.join(__dirname, "fs_mock_files"),
  [
    path.join(__dirname, "fs_mock_files/1"),
    [path.join(__dirname, "fs_mock_files/1/2"), "a_suite.js"],
    "a_suite.js"
  ],
  "a_suite.js",
  "b_suite.js"
];

assert.Equal(
  treeFilesFullDirPath,
  fs.getFilesTree(path.join(__dirname, "fs_mock_files"), 10, {
    fullDirPath: true
  })
);

const treeFilesFullFilePath = [
  "fs_mock_files",
  [
    "1",
    ["2", path.resolve(__dirname, "fs_mock_files/1/2/a_suite.js")],
    path.resolve(__dirname, "fs_mock_files/1/a_suite.js")
  ],
  path.resolve(__dirname, "fs_mock_files/a_suite.js"),
  path.resolve(__dirname, "fs_mock_files/b_suite.js")
];

assert.Equal(
  treeFilesFullFilePath,
  fs.getFilesTree(path.join(__dirname, "fs_mock_files"), 10, {
    fullFilePath: true
  })
);
