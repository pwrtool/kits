import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import { FancyOut } from "@pwrtool/fancy-out";

// I am not used right now!
// Expect to see me in the v2.0 relase
export class Config {
  private values = new Map<string, any>();

  constructor() {
    try {
      const configString = fs.readFileSync(getConfigPath(), "utf-8");
      const config = JSON.parse(configString);

      for (const key in config) {
        this.values.set(key, config[key]);
      }
    } catch (e) {
      FancyOut.warn("⚠ Config file was not found or failed to be parsed\n");
    }
  }

  exists(key: string): boolean {
    return this.values.has(key);
  }

  get(key: string): any {
    return this.values.get(key);
  }

  set(key: string, value: any) {
    this.values.set(key, value);
  }

  getOrThrow(key: string): any {
    const value = this.values.get(key);
    if (value === undefined) {
      throw new Error(`Key ${key} not found in config`);
    }

    return value;
  }
}

export function getConfigPath() {
  return path.join(os.homedir(), ".config", "pwrtool", "config.json");
}
