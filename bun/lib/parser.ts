import { Rundata } from "..";

export interface Arguments {
  get: (key: string) => string | undefined;
  has: (key: string) => boolean;
  all: () => Record<string, string>;
}

export function parseArgv(argv: string[]): Rundata {
  return {
    tool: "default",
    arguments: new Map<string, string>(),
    automated: false,
    runDirectory: "",
    mockInputs: [],
    silent: false,
  };
}
