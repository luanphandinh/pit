const fs = require("fs");
const path = require("path");

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
