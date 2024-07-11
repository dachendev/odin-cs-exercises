import Queue from "./Queue.mjs";

const boardSize = 8;

function hash(pos) {
  return pos[0] * boardSize + pos[1];
}

function onBoard(pos) {
  return pos[0] >= 0 && pos[0] < boardSize && pos[1] >= 0 && pos[1] < boardSize;
}

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

export function knightMoves(graph, source, target) {
  const sourceKey = hash(source);
  const targetKey = hash(target);

  // implement dijkstra without weighted edges
  const q = new Queue();
  const visited = new Set();
  const prev = new Array(graph.length);

  q.enqueue(sourceKey);

  while (!q.isEmpty()) {
    const currentKey = q.dequeue();
    const edges = graph[currentKey].edges;

    if (currentKey === targetKey) {
      break;
    }

    for (const edge of edges) {
      if (!visited.has(edge)) {
        prev[edge] = currentKey;
        q.enqueue(edge);
      }
    }

    visited.add(currentKey);
  }

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