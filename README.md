# pit
A [postman](https://www.getpostman.com) integration test utils.\
Taking advantage of postman's `pre-request script` and `test-script`.\
This utils help `describe and test` your collection with simple syntax.

# Caution
Since postman doesn't have clear `"scopes"` like javascript variables, instead have their own [pm.variables](https://learning.getpostman.com/docs/postman/variables-and-environments/variables/).\
In order to make scripts work, there will be a few `eval()` functions in `lib/t.js`, feel free and inspect the code.\
It's only `eval()` what you code, so please make sure you don't add any danger or malicious script into `describe, test or before` code blocks.

# Install
```
npm i pits
```

# Project structure ([more on example](https://github.com/luanphandinh/pits/tree/master/example))
```
src
  |__GitHubApi
  |     |__GetUserSuite.js
  |     |__OtherSuite.js
  |__googleSuite.js
  |__spotifySuite.js
  |
  |__.pit_collection.js
  |__package.json
```

# Suite declaration

`.pit_collection.js`
```javascript
const path = require("path");

module.exports = {
  name: "Example Fun Postman",
  suites: {
    includes: ["Suite.js"], // patterns for `suite` file, could be anything.
    dirs: [path.join(__dirname)] // paths where `suite` file should be placed.
  }
};
```

Define your simple script like
[example/googleSuite.js](https://github.com/luanphandinh/pits/blob/master/example/googleSuite.js)
```javascript
const { describe, before, test } = require("pits");

module.exports = describe("Let's check google", () => {
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
```

# Run
```
node -e 'require("pits").extract()'
```
This `extract()` function will use the config from `.pit_collection.js` file to generate `.postman_collection.json` into current folder.

If you have [newman](https://www.npmjs.com/package/newman) installed:
```
newman run test.postman_collection.json
```

# [Flow diagram](https://www.draw.io/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=pit.svg#Uhttps%3A%2F%2Fdrive.google.com%2Fuc%3Fid%3D1LAMukZHOzEI1DuxBVMTw8yL-L2ArNVDI%26export%3Ddownload)
# ![diagram](https://github.com/luanphandinh/pit/blob/master/flow.svg)

# TODO
* Adding variables file.
* Improve `pit_collection.json`.
