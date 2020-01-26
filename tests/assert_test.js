const assert = require("./assert");

assert.Equal(1, 1);
assert.Equal("1", "1");

assert.Equal([1, 2, 3], [1, 2, 3]);
assert.Equal([1, "2", 3], [1, "2", 3]);
assert.Equal([1, [2, 3]], [1, [2, 3]]);

assert.Equal({ a: "b", c: [1, 2] }, { a: "b", c: [1, 2] });
assert.Equal(
  { a: "b", c: [1, 2], d: { e: "f", g: "h" } },
  { a: "b", c: [1, 2], d: { e: "f", g: "h" } }
);
assert.Equal(
  { a: "b", c: [1, 2], d: { e: "f", g: "h" }, i: [{ j: "k" }, { l: "m" }] },
  {
    a: "b",
    c: [1, 2],
    d: { e: "f", g: "h" },
    i: [{ j: "k" }, { l: "m" }]
  }
);
