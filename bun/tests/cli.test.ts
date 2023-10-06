import { CLIArgs } from "../lib/cli";
import { ParsedRunstring } from "@pwrtool/runstring";

describe("CLIArgs", () => {
  it("should return the value of an argument", () => {
    const parsedRunstring: ParsedRunstring = {
      tool: "",
      from: "",
      arguments: new Map([["test", "value"]]),
      autoAnswer: false,
      answers: [],
    };

    const cliArgs = new CLIArgs(parsedRunstring);
    expect(cliArgs.get("test")).toBe("value");
    expect(cliArgs.get("test2")).toBe(undefined);
  });

  it("should throw if the argument doesnt exist", () => {
    const parsedRunstring: ParsedRunstring = {
      tool: "",
      from: "",
      arguments: new Map(),
      autoAnswer: false,
      answers: [],
    };

    const cliArgs = new CLIArgs(parsedRunstring);
    expect(() => cliArgs.getOrThrow("test")).toThrow();
  });

  it("should check if an argument exists", () => {
    const parsedRunstring: ParsedRunstring = {
      tool: "",
      from: "",
      arguments: new Map([["test", "value"]]),
      autoAnswer: false,
      answers: [],
    };

    const cliArgs = new CLIArgs(parsedRunstring);
    expect(cliArgs.exists("test")).toBe(true);
    expect(cliArgs.exists("test2")).toBe(false);
  });
});
