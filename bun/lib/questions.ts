import { Rundata } from "..";

export interface IO {
  out: (message: string) => void;
  err: (message: string) => void;
  ask: (question: string) => Promise<string>;
}

function stdIO(): IO {
  return {
    out: (message: string) => {
      console.log(message);
    },
    err: (message: string) => {
      console.log(`\x1b[31mERROR: ${message}`);
    },
    ask: async (question: string) => {
      const readline = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout,
      });
      return new Promise((resolve) => {
        readline.question(question, (answer: string) => {
          resolve(answer);
          readline.close();
        });
      });
    },
  };
}

function mockIO(answers: string[]): IO {
  const mock = {
    answers: answers,
    out: (message: string) => {
      console.log(message);
    },
    err: (message: string) => {
      console.log(`\x1b[31mERROR: ${message}`);
    },
    ask: async () => {
      if (mock.answers.length === 0) {
        throw new Error("No more provided mock questions");
      }
      return mock.answers.shift() as string;
    },
  };
  return mock;
}

function silenceIO(io: IO) {
  io.out = () => { };
  io.err = () => { };
}

export function getIO(rundata: Rundata): IO {
  let io: IO;
  if (rundata.automated) {
    io = mockIO(rundata.mockInputs);
  } else {
    io = stdIO();
  }

  if (rundata.silent) {
    silenceIO(io);
  }

  return io;
}
