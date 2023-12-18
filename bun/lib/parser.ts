import { Rundata } from "..";

export interface Arguments {
  get: (key: string) => string | undefined;
  has: (key: string) => boolean;
  all: () => Record<string, string>;
}

export function parseArgv(argv: string[]): Rundata {
  for (const arg of argv) {
    if (isJSON(arg)) {
      return parseRundata(arg);
    }
  }
  throw new Error("No rundata found");
}

function isJSON(str: string): boolean {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

export function parseRundata(rundataString: string): Rundata {
  const rundata = {
    tool: "default",
    arguments: new Map<string, string>(),
    automated: false,
    runDirectory: "",
    mockInputs: [],
    silent: false,
  };
  const parsed = JSON.parse(rundataString);
  try {
    rundata.tool = parsed.tool;
    rundata.automated = parsed.automated;
    rundata.runDirectory = parsed.runDirectory;
    rundata.mockInputs = parsed.mockInputs;
    rundata.silent = parsed.silent;
    for (const [key, value] of Object.entries(parsed.arguments)) {
      rundata.arguments.set(key, value as string);
    }
  } catch (e) {
    throw new Error(
      "Invalid rundata. If you're a kit developer, this is probably not your fault. Open an issue on the pwrtool/kits github",
    );
  }

  return rundata;
}
