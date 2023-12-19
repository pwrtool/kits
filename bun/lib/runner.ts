import { Rundata } from "..";
import { IO, getIO } from "./questions";

export interface Tool {
  name: string;
  description: string;
  func: (args: Map<string, string>, io: IO) => void;
}

export interface ToolRunner {
  tools: Tool[];
  addTool: (tool: Tool) => void;
  run: (rundata: Rundata) => void;
}

export function makeToolRunner(): ToolRunner {
  const runner: ToolRunner = {
    tools: [],
    addTool: (tool: Tool) => {
      runner.tools.push(tool);
    },
    run: (rundata: Rundata) => {
      const tool = runner.tools.find((t) => t.name === rundata.tool);
      if (!tool) {
        throw new Error(`Tool ${rundata.tool} not found`);
      }

      const io = getIO(rundata);
      tool.func(rundata.arguments, io);
    },
  };

  return runner;
}
