import readline from "readline";
import { FancyOut } from "@pwrtool/fancy-out";

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
    FancyOut.out(message);
  }

  /**
   * Outputs a message to the console in green and bold text
   * @param message - The message to output
   * @return void
   */
  success(message: string) {
    FancyOut.success(message);
  }

  /**
   * Outputs a message to the console in blue and bold text
   * @param message - The message to output
   * @return void
   */
  bold(message: string) {
    FancyOut.bold(message);
  }

  /**
   * Outputs a message to the console in yellow and bold text
   * @param message - The message to output
   * @return void
   */
  warn(message: string) {
    FancyOut.warn(message);
  }

  /**
   * Outputs a message to the console in bold blue text with an underline
   * @param message - The message to output
   * @return void
   */
  header(message: string) {
    FancyOut.header(message);
  }

  /**
   * Outputs a message to the console in red and bold text
   * @param message - The message to output
   * @return void
   */
  error(message: string) {
    FancyOut.error(message);
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
