import readline from "readline";

export class IO {
  static async prompt(question: string): Promise<string> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await new Promise<string>((resolve) => {
      rl.question(`\x1b[37;1m${question}\x1b[0m`, (answer) => {
        resolve(answer);
      });
    });

    rl.close();
    return answer;
  }

  static async dichotomous(question: string): Promise<boolean> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const answer = await new Promise<boolean>((resolve) => {
      rl.question(`\x1b[37;1m${question}\x1b[0m`, (answer) => {
        resolve(answer.toLowerCase() === "y");
      });
    });

    rl.close();
    return answer;
  }

  // This article was very helpful:
  // https://notes.burke.libbey.me/ansi-escape-codes/

  /**
   * Outputs a message to the console
   * @param message - The message to output
   * @return void
   */
  static out(message: string) {
    console.log(message);
  }

  /**
   * Outputs a message to the console in green and bold text
   * @param message - The message to output
   * @return void
   */
  static success(message: string) {
    console.log("\x1b[32;1m%s\x1b[0m", message);
  }

  /**
   * Outputs a message to the console in blue and bold text
   * @param message - The message to output
   * @return void
   */
  static bold(message: string) {
    console.log("\x1b[37;1m%s\x1b[0m", message);
  }

  /**
   * Outputs a message to the console in yellow and bold text
   * @param message - The message to output
   * @return void
   */
  static warn(message: string) {
    console.log("\x1b[33;1m%s\x1b[0m", message);
  }

  /**
   * Outputs a message to the console in bold blue text with an underline
   * @param message - The message to output
   * @return void
   */
  static header(message: string) {
    console.log("\x1b[34;1;4m%s\x1b[0m", message);
  }

  /**
   * Outputs a message to the console in red and bold text
   * @param message - The message to output
   * @return void
   */
  static error(message: string) {
    console.log("\x1b[31;1m%s\x1b[0m", message);
  }
}
