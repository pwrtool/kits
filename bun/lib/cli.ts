import { ParsedRunstring } from "@pwrtool/runstring";
/**
 * Wraps the map containing the arguments provided to the tool in the CLI
 */
export class CLIArgs {
  private args: Map<string, string> = new Map();
  private runDir: string = "";

  constructor(parsedRunstring: ParsedRunstring) {
    this.args = parsedRunstring.arguments;
    this.runDir = parsedRunstring.from;
  }

  get(key: string): string | undefined {
    return this.args.get(key);
  }

  exists(key: string): boolean {
    return this.args.has(key);
  }

  /**
   * Gets a value. If that value is not found, it throws an error.
   * @param The name of the argument to get
   * @return The value of the argument
   */
  getOrThrow(key: string): string {
    const value = this.get(key);
    if (value === undefined) {
      throw new Error(`Argument ${key} not found`);
    }

    return value;
  }

  /**
   * Gets the run directory. If it is not provided, it returns the current working directory.
   */
  getRunDir(): string {
    return this.runDir === "" ? process.cwd() : this.runDir;
  }
}
