// see core/lib.go in the powertool repository

import { Tool, makeToolRunner } from "./lib/runner";
import { parseArgv } from "./lib/parser";

// this is passed to the kit instructing it on what to run
export interface Rundata {
  tool: string;
  arguments: Map<string, string>;
  automated: boolean;
  mockInputs: string[];
  runDirectory: string;
  silent: boolean;
}

export default function powertool(tools: Tool[]) {
  const runner = makeToolRunner();
  tools.forEach((tool) => {
    runner.addTool(tool);
  });

  const rundata = parseArgv(process.argv);

  try {
    runner.run(rundata);
  } catch (e) {
    console.log(`\x1b[31mERROR: ${e}`);
  }
}
