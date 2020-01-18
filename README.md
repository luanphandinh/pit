# pit
postman integration test utils

# Caution
This project is under development.

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
    console.log("{{request_url}} is hard_code, will be more dynamic later");
    pm.variables.set("request_url", "https://google.com");
  });

  test("200", "Test 200 description", () => {
    pm.response.to.have.status(200);
  });

  before("404", () => {
    console.log("This should call when init");
    pm.variables.set("request_url", "https://google.com/404");
  });

  test("404", "Test 404", () => {
    pm.response.to.have.status(404);
  });
});

console.log(JSON.stringify(extract(d), null, 4));
```

Run
If you have `newman` isstalled:
```
make newman
```

Manual way:
```
make suite
```

This will automatically export a `postman_collection.json` file in current folder.
Then use portman to import collection and run.

# TODO
* Able to load all suite from all test files.
* Right now hacking to get `describe, test` to work by manually `console.log` with `extract(suite)`.
* Adding request declartion into test files.
