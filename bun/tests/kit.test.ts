import { Kit, findRunstring, powertool } from "../lib/kit";

describe("Kit", () => {
  it("can add tools", () => {
    const kit = new Kit();
    kit.addTool({
      name: "test",
      function: async () => {},
    });
    expect(kit.tools.length).toBe(1);
  });

  it("can run tools", () => {
    const func = vi.fn();
    const kit = new Kit();
    kit.addTool({
      name: "test",
      function: func,
    });

    kit.runTool("test");
    expect(func).toBeCalled();
  });
  it("throws an error when running a tool that doesn't exist", () => {
    const kit = new Kit();
    expect(() => kit.runTool("test")).toThrow();
  });
});

describe("powertool", () => {
  it("creates a kit, adds tools to it, and runs it based on the runstring", () => {
    const func = vi.fn();
    powertool(
      [
        {
          name: "test",
          function: func,
        },
      ],
      {
        tool: "test",
        from: "test",
        arguments: new Map(),
        autoAnswer: false,
        answers: [],
      }
    );

    expect(func).toBeCalled();
  });
});

describe("getRunstring", () => {
  it("gets the runstring from the command line arguments", () => {
    process.argv = [
      "",
      "",
      "tool:test;from:test;args:[];autoAnswer:f;answers:[]",
    ];
    const runstring = findRunstring();
    expect(runstring.tool).toBe("test");
  });
  it("returns empty if no runstring provided", () => {
    process.argv = ["", ""];
    expect(findRunstring().tool).toBe("");
  });
});
