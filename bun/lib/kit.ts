/**
 * @file Handles running and adding powertools
 * @author firesquid6 <me@jdeiss.com>
 * @license GPL-3.0
 */

import { parseRunstring } from "@pwrtool/runstring";

export interface Tool {
  name: string;
  function: () => Promise<void>;
}

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

const kit = new Kit();
export default kit;
