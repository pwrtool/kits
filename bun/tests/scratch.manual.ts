import outputToScratch from "../lib/scratch";
// just a quick script to test if it works
// not really any point in writing tests for this because everything would have to be mocked

const object = {
  foo: "bar",
  hello: "world",
  baz: "qux",
  number: 42,
};

outputToScratch(object);
