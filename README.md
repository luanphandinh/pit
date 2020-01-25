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

# [Flow diagram](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=pit.svg#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1LAMukZHOzEI1DuxBVMTw8yL-L2ArNVDI%26export%3Ddownload)
# ![diagram](https://github.com/luanphandinh/pit/blob/master/flow.svg)

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

# Run
```
cd example && node ../lib/extract.js
```
This `extract.js` will use the config from `.pit_collection.js` file to generate `.postman_collection.json` into `tests` folder.

`.pit_collection.js`
```javascript
const path = require("path");

module.exports = {
  info: {
    name: "Example Fun Postman",
    schema:
      "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  suites: {
    includes: ["_suite"], // patterns for `suite` file, could be anything.
    paths: [path.join(__dirname)] // paths where `suite` file should be placed.
  }
};
```

If you have [newman](https://www.npmjs.com/package/newman) installed:
```
newman run example/tests/test.postman_collection.json
```

# TODO
* Adding variables file.
* Improve `pit_collection.json`.
