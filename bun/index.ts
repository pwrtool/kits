/**
 * @file Exports all the modules defined in lib
 * @author Jonathan Deiss <me@jdeiss.com>
 * @license GPL-3.0
 */

import { powertool, findRunstring, Kit } from "./lib/kit";

export default powertool;

export { findRunstring, Kit };

export function exitWithSuccess() {
  process.exit(0);
}

export function exitWithError() {
  process.exit(1);
}
