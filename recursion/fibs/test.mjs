import assert from "node:assert";
import { fibs } from "./fibs.mjs";
import { fibsRec } from "./fibsRec.mjs";

assert.deepEqual(fibs(8), [0, 1, 1, 2, 3, 5, 8, 13]);

assert.deepEqual(fibsRec(8), [0, 1, 1, 2, 3, 5, 8, 13]);

console.log("All tests passed.");
