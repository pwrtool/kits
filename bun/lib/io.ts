import readline from "readline";

export class IO {
  private questioner: Questioner;

  constructor(questioner: Questioner) {
    this.questioner = questioner;
  }

  async prompt(question: string): Promise<string> {
    return await this.questioner.prompt(question);
  }

  async dichotomous(question: string): Promise<boolean> {
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
  out(message: string) {
    console.log(message);
  }

  /**
   * Outputs a message to the console in green and bold text
   * @param message - The message to output
   * @return void
   */
  success(message: string) {
    console.log("\x1b[32;1m%s\x1b[0m", message);
  }

  /**
   * Outputs a message to the console in blue and bold text
   * @param message - The message to output
   * @return void
   */
  bold(message: string) {
    console.log("\x1b[37;1m%s\x1b[0m", message);
  }

  /**
   * Outputs a message to the console in yellow and bold text
   * @param message - The message to output
   * @return void
   */
  warn(message: string) {
    console.log("\x1b[33;1m%s\x1b[0m", message);
  }

  /**
   * Outputs a message to the console in bold blue text with an underline
   * @param message - The message to output
   * @return void
   */
  header(message: string) {
    console.log("\x1b[34;1;4m%s\x1b[0m", message);
  }

  /**
   * Outputs a message to the console in red and bold text
   * @param message - The message to output
   * @return void
   */
  error(message: string) {
    console.log("\x1b[31;1m%s\x1b[0m", message);
  }
}

export abstract class Questioner {
  abstract prompt(question: string): Promise<string>;
  abstract dichotomous(question: string): Promise<boolean>;
}

export class ConsoleQuestioner extends Questioner {
  async prompt(question: string): Promise<string> {
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

  async dichotomous(question: string): Promise<boolean> {
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
}

export class FakeQuestioner extends Questioner {
  private answers: string[];
  constructor(answers: string[]) {
    super();
    this.answers = answers;
  }

  async prompt(_question: string): Promise<string> {
    return Promise.resolve(this.answers.shift() || "");
  }

  async dichotomous(_question: string): Promise<boolean> {
    return Promise.resolve(this.answers.shift() === "y");
  }
}
