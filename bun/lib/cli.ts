import { ParsedRunstring } from "@pwrtool/runstring";
/**
 * Wraps the map containing the arguments provided to the tool in the CLI
 */
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
}
