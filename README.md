# pit
A [postman](https://www.getpostman.com) integration test utils.\
Taking advantage of postman's `pre-request script` and `test-script`.\
This utils help `describe and test` your collection with simple syntax.

# Caution
This project is under development.
### Dangers:
Since postman doesn't have clear `"scopes"` like javascript variables, instead have their own [pm.variables](https://learning.getpostman.com/docs/postman/variables-and-environments/variables/).\
In order to make scripts work, there will be a few `eval()` functions in `lib/t.js`, feel free and inspect the code.\
It's only `eval()` what you code, so please make sure you don't add any danger or malicious script into `describe, test or before` code blocks.

# Flow diagram
Showing how this utils interact with postman.\
Implementing....

# How it work
Define your simple script like this(see more at `example/google_suite.js` or `example/spotify_suite.js`):

```javascript
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

If you have [newman](https://www.npmjs.com/package/newman) installed:
```
newman run example/tests/test.postman_collection.json
```

# TODO
* Collection declartion, right now only have suite declartion.
* Adding request declartion into test files.
* Adding variables file.
