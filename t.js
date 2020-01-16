let USE_MOCK = false;
const _postman_storage_mock_ = {};
_postman_mock_ = {};
_postman_mock_.setNextRequest = () => {};
const _pm_mock_ = {
  variables: {
    get: any => _postman_storage_mock_[any],
    set: (key, val) => (_postman_storage_mock_[key] = val)
  },
  test: (msg, callback) => {
    console.log(msg);
    callback();
  }
};

const _pm_ = () => {
  if (USE_MOCK) {
    return _pm_mock_;
  }

  return pm;
};

const _postman_ = () => {
  if (USE_MOCK) {
    return _postman_mock_;
  }
  return postman;
};

const mock = () => {
  USE_MOCK = true;
};

const log = message => {
  if (_pm_().variables.get("TEST_VERBOSE") === 1) {
    console.log(message);
  }
};

const init = () => {
  let pit = _pm_().variables.get("pit");
  pit = {
    suite: {},
    tests: {},
    schedule: [],
    lock: false
  };
  _pm_().variables.set("pit", pit);
};

const set = (name, value) => {
  const pit = _pm_().variables.get("pit");
  pit[name] = value;
  _pm_().variables.set("pit", pit);
};

const get = name => {
  const pit = _pm_().variables.get("pit");
  return pit ? pit[name] : null;
};

const lock = () => {
  set("lock", true);
};

const unlock = () => {
  set("lock", false);
};

const isLock = () => {
  return get("lock");
};

const describe = (name, description, prepare) => {
  if (isLock()) {
    runBeforeTest();
    return;
  }

  init();
  set("suite", {
    name: name,
    description: description
  });

  prepare();
  lock();
  runBeforeTest();
};

const test = (name, description, callback) => {
  const tests = get("tests");
  const schedule = get("schedule");

  tests[name] = {
    ...tests[name],
    name: name,
    description: description,
    callback: callback.toString()
  };
  schedule.push(name);

  set("tests", tests);
  set("schedule", schedule);
};

const before = (name, callback) => {
  const tests = get("tests");
  tests[name] = {
    ...tests[name],
    before: callback.toString()
  };

  set("tests", tests);
};

const getCurrentTest = () => {
  const tests = get("tests");
  const schedule = get("schedule");
  if (schedule.length > 0) {
    return tests[schedule[0]];
  }

  return null;
};

const doneTest = () => {
  suite = get("suite");
  schedule = get("schedule");
  schedule.shift();
  set("schedule", schedule);
  if (schedule.length === 0) {
    unlock();
    log(`Test suite: ${suite.name} Done.`);
  } else {
    log(`Next scheduled tests: ${schedule}.`);
    _postman_().setNextRequest(suite.name);
  }
};

const runBeforeTest = () => {
  const test = getCurrentTest();
  if (test.before) {
    log(`Running pre-script for ${test.name}`);
    eval(test.before)();
    log("\t Done.");
  } else {
    log(`No pre-script for ${test.name}`);
  }
};

const runTest = () => {
  const test = getCurrentTest();
  if (test.callback) {
    log(`Running test for ${test.name} | ${test.description}`);
    _pm_().test(test.description, () => eval(test.callback)());
    log("\t Done.");
  }
  doneTest();
};

module.exports = {
  log: log,
  describe: describe,
  test: test,
  before: before,
  runTest: runTest,
  mock: mock
};
