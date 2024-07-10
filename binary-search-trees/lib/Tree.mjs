import Node from "./Node.mjs";

export default class Tree {
  constructor(arr) {
    this.root = Tree.buildTreeRec(arr);
  }

  /**
   * @param {any[]} arr
   * @param {number} start
   * @param {number} end
   * @returns {Node}
   */
  static buildTreeRec(arr, start = 0, end = arr.length - 1) {
    // Base case
    if (start > end) {
      return null;
    }

    // Find the midpoint and create a new node using it
    const mid = Math.floor((start + end) / 2);
    const node = new Node(arr[mid]);

    // Recursively build the left subtree
    node.left = Tree.buildTreeRec(arr, start, mid - 1);

    // Recursively build the right subtree
    node.right = Tree.buildTreeRec(arr, mid + 1, end);

    return node;
  }

  /**
   * @param {Node} root
   * @param {string} prefix
   * @param {boolean} isLeft
   */
  static prettyPrintRec(root, prefix = "", isLeft = true) {
    // Base case
    if (!root) {
      return;
    }

    if (root.right) {
      Tree.prettyPrintRec(
        root.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.value}`);

    if (root.left) {
      Tree.prettyPrintRec(root.left, `${prefix}${isLeft ? "    " : "│   "}`);
    }
  }

  static insertRec(root, value) {
    // Base case
    if (!root) {
      return new Node(value);
    }

    // Recursively search for leaf node
    if (value < root.value) {
      root.left = Tree.insertRec(root.left, value);
    } else {
      root.right = Tree.insertRec(root.right, value);
    }

    return root;
  }

  static minValue(node) {
    let minv = node.value;
    while (node.left) {
      minv = node.left.value;
      node = node.left;
    }
    return minv;
  }

  static deleteItemRec(root, value) {
    // Base case
    if (!root) {
      return null;
    }

    // Recursively search for target node
    if (value < root.value) {
      root.left = Tree.deleteItemRec(root.left, value);
    } else if (value > root.value) {
      root.right = Tree.deleteItemRec(root.right, value);
    } else {
      // Node with only one child (or no child)
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // Node with two children, get inorder successor
      root.value = Tree.minValue(root.right);

      // Delete it
      root.right = Tree.deleteItemRec(root.right, root.value);
    }

    return root;
  }

  prettyPrint() {
    Tree.prettyPrintRec(this.root);
  }

  insert(value) {
    this.root = Tree.insertRec(this.root, value);
  }

  deleteItem(value) {
    this.root = Tree.deleteItemRec(this.root, value);
  }

  find(value) {}

  levelOrder(callback) {}

  inOrder(callback) {}

  preOrder(callback) {}

  postOrder(callback) {}

  height(node) {}

  depth(node) {}

  isBalanced() {}

  rebalance() {}
}
