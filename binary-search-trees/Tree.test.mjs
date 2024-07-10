import * as assert from "node:assert";
import Tree from "./Tree.mjs";

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(array, { sorted: false });

// confirm that the tree is balanced
assert.ok(tree.isBalanced());

// print the tree
tree.prettyPrint();

// test level order
assert.deepStrictEqual(
  tree.levelOrder(),
  [8, 4, 67, 1, 5, 9, 324, 3, 7, 23, 6345]
);

// test preorder
assert.deepStrictEqual(
  tree.preOrder(),
  [8, 4, 1, 3, 5, 7, 67, 9, 23, 324, 6345]
);

// test inorder
assert.deepStrictEqual(
  tree.inOrder(),
  [1, 3, 4, 5, 7, 8, 9, 23, 67, 324, 6345]
);

// test postorder
assert.deepStrictEqual(
  tree.postOrder(),
  [3, 1, 7, 5, 4, 23, 9, 6345, 324, 67, 8]
);

// test height
assert.strictEqual(tree.height(), 4);

// test depth
assert.strictEqual(tree.depth(tree.root), 0);
assert.strictEqual(tree.depth(tree.find(23)), 3);

// unbalance the tree
tree.insert(1111);
tree.insert(2222);
tree.insert(3333);
tree.insert(4444);
tree.insert(5555);

// confirm that the tree is unbalanced
assert.ok(!tree.isBalanced());

// test rebalance
tree.rebalance();
assert.ok(tree.isBalanced());

// print the tree
tree.prettyPrint();

console.log("All tests passed.");
