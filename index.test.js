const get_hello = require("./index");

describe("get_hello()", () => {
  it("returns 'Hello, World!' string", () => {
    expect(get_hello()).toEqual("Hello World!");
  });
});
