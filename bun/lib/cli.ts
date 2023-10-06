import { ParsedRunstring } from "@pwrtool/runstring";

export class CLIArgs {
  private args: Map<string, string> = new Map();

  constructor(parsedRunstring: ParsedRunstring) {
    this.args = parsedRunstring.arguments;
  }

  get(key: string): string | undefined {
    return this.args.get(key);
  }

  exists(key: string): boolean {
    return this.args.has(key);
  }

  getOrThrow(key: string): string {
    const value = this.get(key);
    if (value === undefined) {
      throw new Error(`Argument ${key} not found`);
    }

    return value;
  }
}
