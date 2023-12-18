import { test, describe, expect } from "bun:test";
import { parseArgv, parseRundata } from "../lib/parser";

describe("parseArgv", () => {
  const lastArg = JSON.stringify({
    tool: "tool",
    arguments: {
      hello: "world",
    },
    automated: false,
    runDirectory: "",
    mockInputs: [],
    silent: false,
  });
  const expected = {
    tool: "tool",
    arguments: new Map([["hello", "world"]]),
    automated: false,
    runDirectory: "",
    mockInputs: [],
    silent: false,
  };
  test("it ignores bun and run", () => {
    const result = parseArgv(["bun", "run", lastArg]);
    expect(result).toEqual(expected);
  });
  test("it ignores bun and run and other args", () => {
    const result = parseArgv(["bun", "run", "hello", lastArg]);
    expect(result).toEqual(expected);
  });
  test("it throws if rundata is not found", () => {
    expect(() => parseArgv(["bun", "run"])).toThrow();
  });
});

describe("parseRundata", () => {
  test("it parses correctly formatted rundata", () => {
    const rundata = {
      tool: "default",
      arguments: {
        hello: "world",
      },
      automated: false,
      runDirectory: "",
      mockInputs: ["hello"],
      silent: false,
    };
    const result = parseRundata(JSON.stringify(rundata));

    expect(result).toEqual({
      tool: "default",
      arguments: new Map([["hello", "world"]]),
      automated: false,
      runDirectory: "",
      mockInputs: ["hello"],
      silent: false,
    });
  });
  test("it throws if the rundata is invalid", () => {
    expect(() => parseRundata("hello world")).toThrow();
  });
});
