const fs = require("fs");
const path = require("path");

const FLAT = "flat";
const TREE = "tree";

const defaultOptions = {
  format: FLAT, // or TREE,
  fullFilePath: false, // return full path of file and dir.
  fullDirPath: false // return full path of file.
};

const combineOptions = options => {
  return {
    ...options,
    fullFilePath: options.fullPath || options.fullFilePath,
    fullDirPath: options.fullPath || options.fullDirPath
  };
};

const getFileName = (name, fullPath) => {
  return fullPath === true ? name : path.basename(name);
};

const find = (dir, nested = 10, opts) => {
  const options = combineOptions(opts);
  if (nested <= 0) {
    return [];
  }

  let results = [];
  if (options.format === TREE) {
    results = [getFileName(dir, options.fullDirPath)];
  }

  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return results;
  }

  files.forEach(file => {
    const filePath = path.resolve(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      options.format === TREE
        ? results.push(find(filePath, nested - 1, options))
        : (results = results.concat(find(filePath, nested - 1, options)));
    } else {
      results.push(getFileName(filePath, options.fullFilePath));
    }
  });

  return results;
};

// Return files in current dir recursively
// @params:
//    dir: string => directory.
//    nested: number => indicate how many nested levels this function will traverse.
// @return:
//    filesName: []string => full path of all files within nested level. (no directory)
const FindFiles = (dir, nested = 10, options = {}) => {
  return find(dir, nested, { format: FLAT, fullPath: true, ...options });
};

// Return files in current dir undertree format.
// src
//  |__a
//  |  |__b.js
//  |__c.js
//  tree = ["src", ["a", "b.js"], "c.js"];
//  Explain: if item is an array then the first item will be a directory, follow with with its sub items.
// @params:
//    dir: string => directory.
//    nested: number => indicate how many nested levels this function will traverse.
// @return:
//    treeArray: []string => full path of all files within nested level. (no directory)
const GetFilesTree = (dir, nested = 10, options = {}) => {
  return find(dir, nested, { format: TREE, ...options });
};

module.exports = {
  findFiles: FindFiles,
  getFilesTree: GetFilesTree
};
