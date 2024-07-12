/**
 * @typedef {{value: [number, number], edges: number[]}} GraphNode
 */

import Queue from "./Queue.mjs";

/**
 * The size of the chessboard
 */
const boardSize = 8;

/**
 * Calculates the hash value for a given position on the board
 *
 * @param {[number, number]} pos - The position coordinates [x, y]
 * @return {number} The calculated hash value
 */
function hash(pos) {
  return pos[0] * boardSize + pos[1];
}

/**
 * Determines if the given position is within the bounds of the board
 *
 * @param {[number, number]} pos - The position coordinates [x, y]
 * @return {boolean} True if the position is on the board, false otherwise
 */
function onBoard(pos) {
  return pos[0] >= 0 && pos[0] < boardSize && pos[1] >= 0 && pos[1] < boardSize;
}

/**
 * Returns an array of possible moves for a knight on a chessboard
 *
 * @param {[number, number]} source - The starting position of the knight as a tuple of coordinates [x, y]
 * @return {[number, number][]} An array of possible moves as tuples of coordinates
 */
function possibleMoves(source) {
  const [x, y] = source;

  return [
    [x + 1, y - 2],
    [x + 2, y - 1],
    [x + 2, y + 1],
    [x + 1, y + 2],
    [x - 1, y + 2],
    [x - 2, y + 1],
    [x - 2, y - 1],
    [x - 1, y - 2],
  ];
}

/**
 * Builds a graph representing the chessboard
 *
 * @return {GraphNode[]} The built graph representing the chessboard
 */
export function buildGraph() {
  const graph = new Array(boardSize ** 2);

  for (let y = 0; y < boardSize; y++) {
    for (let x = 0; x < boardSize; x++) {
      const pos = [x, y];
      const edges = possibleMoves(pos).reduce((acc, move) => {
        if (onBoard(move)) {
          acc.push(hash(move));
        }
        return acc;
      }, []);

      graph[hash(pos)] = { value: pos, edges };
    }
  }

  return graph;
}

/**
 * Finds the shortest path from the source to the target using the Breadth-First Search algorithm
 *
 * @param {GraphNode[]} graph - The graph represented as an array of objects, where each object contains the value and edges of a vertex
 * @param {number[]} source - The starting position of the knight as a tuple of coordinates [x, y]
 * @param {number[]} target - The target position of the knight as a tuple of coordinates [x, y]
 * @return {number[]} The shortest path from the source to the target as an array of tuples of coordinates
 */
export function knightMoves(graph, source, target) {
  const sourceKey = hash(source);
  const targetKey = hash(target);

  const q = new Queue();
  const visited = new Set();
  const prev = new Array(graph.length);

  q.enqueue(sourceKey);

  // bfs
  // see dijkstra's algorithm
  search: while (!q.isEmpty()) {
    const currentKey = q.dequeue();
    const edges = graph[currentKey].edges;

    if (currentKey === targetKey) {
      break;
    }

    for (const edge of edges) {
      if (visited.has(edge)) {
        // go to next edge
        continue;
      }

      prev[edge] = currentKey;

      if (edge === targetKey) {
        // found target
        break search;
      }

      q.enqueue(edge);
    }

    visited.add(currentKey);
  }

  // reconstruct path
  const path = [];

  if (prev[targetKey] !== undefined || targetKey === sourceKey) {
    let currentKey = targetKey;
    while (currentKey !== undefined) {
      path.unshift(graph[currentKey].value);
      currentKey = prev[currentKey];
    }
  }

  return path;
}
