# pit
postman integration test utils

# Caution
This project is under development, lots of stuff won't work, but the idea is there.

# What
Make your postman collection testable.

# How it work
Define your simple script like this(see more at `example/fun_suite.js`):

```
const { describe, before, test } = require("../t")(true);
const { extract } = require("../extract");

const d = describe("Suite name", "Here go the suite description", () => {
  before("200", () => {
    console.log("This will be called before sending request");
  });

  test("200", "Test 200 description", () => {
    pm.response.to.have.status(200);
  });

  before("403", () => {
    console.log("This should call when init");
  });

  test("403", "This test will be failed because return still 200", () => {
    pm.response.to.have.status(403);
  });
});

console.log(JSON.stringify(extract(d), null, 4));
```

Run
If you have `newman` isstalled:
```
make test-newman
```

Manual way:
```
make test
```

This will automatically export a `postman_collection.json` file in current folder.
Then use portman to import collection and run.

# TODO
* Able to load all suite from all test files.
* Right now hacking to get `describe, test` to work by manually `console.log` with `extract(suite)`.
* Adding request declartion into test files.
