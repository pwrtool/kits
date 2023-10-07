import { Config } from "../lib/config";

describe("Config", () => {
  it("should return the value of a key", () => {
    const config = new Config();
    config.set("test", "value");
    expect(config.get("test")).toBe("value");
  });

  it("should throw if the key doesnt exist", () => {
    const config = new Config();
    expect(() => config.getOrThrow("test")).toThrow();
  });

  it("should check if a key exists", () => {
    const config = new Config();
    config.set("test", "value");
    expect(config.exists("test")).toBe(true);
    expect(config.exists("test2")).toBe(false);
  });
});
