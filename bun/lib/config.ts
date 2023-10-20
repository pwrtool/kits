import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { FancyOut } from "@pwrtool/fancy-out";
import YAML from "yaml";

export class Config {
  private values = new Map<string, any>();

  constructor(cwd: string) {
    try {
      const configString = fs.readFileSync(getConfigPath(), "utf-8");
      const config = YAML.parse(configString);

      for (const key in config) {
        this.values.set(key, config[key]);
      }
    } catch (e) {
      FancyOut.warn("⚠ Config file was not found or failed to be parsed\n");
    }

    if (fs.existsSync(path.join(cwd, "ptconfig.yaml"))) {
      const configString = fs.readFileSync(
        path.join(cwd, "ptconfig.yaml"),
        "utf-8",
      );
      const config = YAML.parse(configString);

      for (const key in config) {
        this.values.set(key, config[key]);
      }
    }
  }

  exists(key: string): boolean {
    return this.values.has(key);
  }

  get(key: string): any {
    return this.values.get(key);
  }

  getOrThrow(key: string): any {
    const value = this.values.get(key);
    if (value === undefined) {
      throw new Error(`Key ${key} not found in config`);
    }

    return value;
  }

  getOrDefault(key: string, defaultValue: string) {
    const value = this.values.get(key);
    if (value === undefined) {
      return defaultValue;
    }
    return value;
  }
}

export function getConfigPath() {
  return path.join(os.homedir(), ".config", "powertool", "config.yaml");
}
