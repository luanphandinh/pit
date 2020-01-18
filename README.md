# pit
postman integration test utils

# Caution
This project is under development.

# What
Make your postman collection testable.

# How it work
Define your simple script like this(see more at `example/fun_suite.js`):

```
const { describe, before, test } = require("../lib/t")(true);

module.exports = describe(
  "Let's check google",
  "Here go the suite description",
  () => {
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
  }
);
```

Run
`exctractColleciton` from `example/collection.js` will find all `_suite` files and the combine into `postman_collection/v2.1` file.
```
node example/collection.js > example/tests/test.postman_collection.json
```

If you have `newman` isstalled:
```
newman run example/tests/test.postman_collection.json
```

# TODO
* Collection declartion, right now only have suite declartion.
* Adding request declartion into test files.
* Adding variables file.
