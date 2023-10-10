import powertool from "..";

powertool(
  [
    {
      name: "hello-world",
      function: async (IO) => {
        console.log("Hello World!");
        const name = await IO.prompt("What is your name?");
        console.log(name);
      },
    },
  ],
  {
    tool: "hello-world",
    from: "/home/firesquid/",
    arguments: new Map(),
    autoAnswer: false,
    answers: [],
  },
);
