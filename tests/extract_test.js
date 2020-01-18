const { getSuites } = require("../lib/extract");
const assert = require("./assert");

suites = getSuites("./example");
assert.Equal(["fun_suite.js"].toString(), suites.toString());
