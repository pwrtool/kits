//idk how to test this other than just manually verifying it
import { IO } from "../lib/io";

const answer = await IO.prompt("Enter a message: ");
IO.out(answer);

const sure = await IO.dichotomous("Are you sure? ");
IO.out(sure ? "Yes" : "No");
