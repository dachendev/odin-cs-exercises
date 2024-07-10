import assert from "node:assert";
import { mergeSort } from "./mergeSort.mjs";

assert.deepEqual(
  mergeSort([3, 2, 1, 13, 8, 5, 0, 1]),
  [0, 1, 1, 2, 3, 5, 8, 13]
);

assert.deepEqual(mergeSort([105, 79, 100, 110]), [79, 100, 105, 110]);

console.log("All tests passed.");
