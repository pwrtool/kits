// see core/lib.go in the powertool repository
// this is passed to the kit instructing it on what to run
export interface Rundata {
  tool: string;
  arguments: Map<string, string>;
  automated: boolean;
  mockInputs: string[];
  runDirectory: string;
  silent: boolean;
}
