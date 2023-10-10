/**
 * @file Handles running and adding powertools
 * @author firesquid6 <me@jdeiss.com>
 * @license GPL-3.0
 */
import { Config } from "./config";
import { IO, ConsoleQuestioner, FakeQuestioner, Questioner } from "./io";
import { CLIArgs } from "./cli";
import { parseRunstring, ParsedRunstring } from "@pwrtool/runstring";

export interface Tool {
  name: string;
  function: (IO: IO, config: Config, args: CLIArgs) => Promise<void>;
}
/**
 * handles adding and running tools. Everything does what you'd think.
 */
export class Kit {
  tools: Tool[] = [];
  private IO: IO;
  private config: Config;
  private args: CLIArgs;

  constructor(IO: IO, config: Config, args: CLIArgs) {
    this.IO = IO;
    this.config = config;
    this.args = args;
  }

  addTool(tool: Tool) {
    this.tools.push(tool);
  }

  runTool(toolName: string) {
    const tool = this.tools.find((tool) => tool.name === toolName);
    if (tool === undefined) {
      throw new Error(`Tool ${toolName} not found`);
    }

    tool.function(this.IO, this.config, this.args);
  }
}
/**
 * Creates a kit, adds tools to it, and runs it based on the runstring.
 * @param tools An array of tools to add to the kit.
 * @param runstring The runstring to run the kit with.
 */
export function powertool(
  tools: Tool[],
  runstring: ParsedRunstring | undefined = undefined,
) {
  if (runstring === undefined) {
    runstring = findRunstring();
  }
  let questioner: Questioner;

  if (runstring.autoAnswer) {
    questioner = new FakeQuestioner(runstring.answers);
  } else {
    questioner = new ConsoleQuestioner();
  }

  const kit = new Kit(new IO(questioner), new Config(), new CLIArgs(runstring));

  for (const tool of tools) {
    kit.addTool(tool);
  }

  kit.runTool(runstring.tool);
}

/**
 * Gets the runstring from the command line arguments and parses it. Throws an error if it fails
 */
export function findRunstring(): ParsedRunstring {
  console.log("I'm being run");
  if (process.argv.length < 4) {
    console.warn("No runstring provided");
    return {
      tool: "",
      from: "",
      arguments: new Map(),
      autoAnswer: false,
      answers: [],
    };
  }

  const runstring = process.argv[3];
  return parseRunstring(runstring);
}
