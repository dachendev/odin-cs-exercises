import { buildGraph, knightMoves } from "./knight-moves.mjs";
import * as assert from "assert";

const graph = buildGraph();

graph.forEach((vertex, key) => {
  console.log(`${key}: ${JSON.stringify(vertex)}`);
});

const pathCases = [
  {
    source: [0, 0],
    target: [3, 3],
    min: 3,
  },
  {
    source: [3, 3],
    target: [0, 0],
    min: 3,
  },
  {
    source: [0, 0],
    target: [7, 7],
    min: 7,
  },
];

pathCases.forEach(({ source, target, min }) => {
  const path = knightMoves(graph, source, target);
  assert.equal(path.length, min);

  console.log(`${source} -> ${target}: ${JSON.stringify(path)}`);
});

console.log("All tests passed!");
