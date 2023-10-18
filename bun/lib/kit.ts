/**
 * @file Handles running and adding powertools
 * @author firesquid6 <me@jdeiss.com>
 * @license GPL-3.0
 */
import { Config } from "./config";
import { IO, ConsoleQuestioner, FakeQuestioner, Questioner } from "./io";
import { CLIArgs } from "./cli";
import { parseRunstring, ParsedRunstring } from "@pwrtool/runstring";
import { FancyOut } from "@pwrtool/fancy-out";
const allowedCharacters =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890-_";

export interface Tool {
  name: string;
  function: (IO: IO, args: CLIArgs) => Promise<void | object>;
}

/**
 * handles adding and running tools. Everything does what you'd think.
 */
export class Kit {
  tools: Tool[] = [];
  private IO: IO;
  //private config: Config;
  private args: CLIArgs;

  constructor(IO: IO, args: CLIArgs) {
    this.IO = IO;
    //this.config = config;
    this.args = args;
  }

  addTool(tool: Tool) {
    for (let i = 0; i < tool.name.length; i++) {
      if (!allowedCharacters.includes(tool.name[i])) {
        FancyOut.error(`Tool name ${tool.name} contains invalid character`);
        FancyOut.out(
          "Allowed characters are: " + allowedCharacters.split("").join(", "),
        );

        process.exit(1);
      }
    }

    this.tools.push(tool);
  }

  runTool(toolName: string) {
    if (toolName === "") {
      toolName = "default";
    }

    const tool = this.tools.find((tool) => tool.name === toolName);
    if (tool === undefined) {
      throw new Error(`Tool ${toolName} not found`);
    }

    tool.function(this.IO, this.args);
  }
}
/**
 * Creates a kit, adds tools to it, and runs it based on the runstring.
 * @param tools An array of tools to add to the kit.
 * @param runstring The runstring to run the kit with. Finds the runstring from cli args if not provided
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

  const kit = new Kit(new IO(questioner), new CLIArgs(runstring));

  for (const tool of tools) {
    kit.addTool(tool);
  }

  kit.runTool(runstring.tool);
}

/**
 * Gets the runstring from the command line arguments and parses it. Throws an error if it fails
 */
export function findRunstring(): ParsedRunstring {
  for (let i = 0; i < process.argv.length; i++) {
    const arg = process.argv[i];
    if (
      arg.includes("args:") &&
      arg.includes("tool:") &&
      arg.includes("from:") &&
      arg.includes(";") &&
      arg.includes("autoAnswer:") &&
      arg.includes("answers:")
    ) {
      return parseRunstring(arg);
    }
  }

  FancyOut.error("No runstring was provided. The args were: ");
  console.log(process.argv);
  return {
    tool: "default",
    from: "",
    arguments: new Map(),
    autoAnswer: false,
    answers: [],
  };
}
