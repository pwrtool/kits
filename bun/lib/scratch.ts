import { FancyOut } from "@pwrtool/fancy-out";
import os from "os";
import path from "path";

export default async function outputToScratch(data: object) {
  const scratchFile = path.join(os.homedir(), ".powertool", "scratch.json");

  try {
    await Bun.write(scratchFile, JSON.stringify(data, null, 2));
  } catch (e) {
    FancyOut.warn("Failed to write scratch file.");
    FancyOut.out(e as string);
  }
}
