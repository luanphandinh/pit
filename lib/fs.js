const fs = require("fs");
const path = require("path");

// Return full path of files in current dir recursively
// @params:
//    dir: string => directory.
//    nested: number => indicate how many nested levels this function will traverse.
// @return:
//    filesName: []string => full path of all files within nested level. (no directory)
const FindFiles = (dir, nested = 10) => {
  if (nested <= 0) {
    return [];
  }

  let results = [];
  const files = fs.readdirSync(dir);
  if (files.length === 0) {
    return results;
  }

  files.forEach(file => {
    const filePath = path.resolve(dir, file);
    const stat = fs.statSync(filePath);
    if (stat.isDirectory()) {
      results = results.concat(FindFiles(filePath, nested - 1));
    } else {
      results.push(filePath);
    }
  });

  return results;
};

module.exports = {
  findFiles: FindFiles
};
