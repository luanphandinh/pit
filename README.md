# pit
postman integration test utils

# Caution
This project is under development, lots of stuff won't work, but the idea is there.

# What
Make your postman collection testable.

# How it work
Define your simple script like this(see more at `example/fun_suite.js`):

```
const { mock, describe, before, test, log } = require("../t");
const { extract } = require("../extract");

mock();

const d = describe("Suite name", "Here go the suite description", () => {
  before("200", () => {
    log("This should call when init");
  });

  test("200", "Test 200 description", () => {
    log("This test is OK");
  });

  before("403", () => {
    log("This should call when init");
  });

  test("403", "Test 403 description", () => {
    log("This test is not quite OK");
  });
});

console.log(JSON.stringify(extract(d), null, 4));
```

Run
```
make test
```

This will automatically export a `postman_collection.json` file in current folder.
Then use portman to import collection and run.

# TODO
* Need to add the `t.js` into collection under name of `t`
* The flow based on implementation on `t.js`
