import { makeToolRunner } from "../lib/runner";
import { describe, test, expect } from "bun:test";

describe("Tool Runner", () => {
  test("should run a tool", () => {
    const runner = makeToolRunner();
    const tool = {
      name: "test",
      description: "test tool",
      func: (args: Map<string, string>, io: any) => {
        expect(args.get("test")).toEqual("test");
        expect(io).toBeDefined();
      },
    };
    runner.addTool(tool);
    runner.run({
      tool: "test",
      arguments: new Map([["test", "test"]]),
      automated: false,
      mockInputs: [],
      runDirectory: "",
      silent: false,
    });
  });
  test("should throw an error if tool not found", () => {
    const runner = makeToolRunner();
    expect(() => {
      runner.run({
        tool: "test",
        arguments: new Map(),
        automated: false,
        mockInputs: [],
        runDirectory: "",
        silent: false,
      });
    }).toThrow();
  });
});
