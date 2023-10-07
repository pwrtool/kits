/**
 * @file Handles running and adding powertools
 * @author firesquid6 <me@jdeiss.com>
 * @license GPL-3.0
 */
import { Config } from "./config";
import { IO } from "./io";
import { CLIArgs } from "./cli";
import { parseRunstring, ParsedRunstring } from "@pwrtool/runstring";

export interface Tool {
  name: string;
  function: () => Promise<void>;
}
/**
 * handles adding and running tools. Everything does what you'd think.
 */
export class Kit {
  tools: Tool[] = [];

  addTool(tool: Tool) {
    this.tools.push(tool);
  }

  runTool(toolName: string) {
    const tool = this.tools.find((tool) => tool.name === toolName);
    if (tool === undefined) {
      throw new Error(`Tool ${toolName} not found`);
    }

    tool.function();
  }
}
/**
 * Creates a kit, adds tools to it, and runs it based on the runstring.
 * @param tools An array of tools to add to the kit.
 * @param runstring The runstring to run the kit with.
 */
export function powertool(
  tools: Tool[],
  runstring: ParsedRunstring | undefined = undefined
) {
  if (runstring === undefined) {
    runstring = findRunstring();
  }

  const kit = new Kit();
  for (const tool of tools) {
    kit.addTool(tool);
  }

  kit.runTool(runstring.tool);
  return {
    IO: new IO(),
    config: new Config(),
    args: new CLIArgs(findRunstring()),
  };
}

/**
 * Gets the runstring from the command line arguments and parses it. Throws an error if it fails
 */
export function findRunstring(): ParsedRunstring {
  if (process.argv.length < 3) {
    console.warn("No runstring provided");
    return {
      tool: "",
      from: "",
      arguments: new Map(),
      autoAnswer: false,
      answers: [],
    };
  }

  const runstring = process.argv[2];
  return parseRunstring(runstring);
}
