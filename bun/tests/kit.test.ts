import { Kit } from "../lib/kit";

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
