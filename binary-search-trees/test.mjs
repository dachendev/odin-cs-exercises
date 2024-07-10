import Tree from "./lib/Tree.mjs";

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sorted = arr.sort().filter((el, i, arr) => i === arr.indexOf(el));
const tree = new Tree(sorted);

tree.prettyPrint();

tree.insert(420);

tree.prettyPrint();

tree.deleteItem(420);

tree.prettyPrint();
