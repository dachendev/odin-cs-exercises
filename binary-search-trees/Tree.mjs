import Node from "./Node.mjs";
import Queue from "./Queue.mjs";

/** Represents a binary search tree */
export default class Tree {
  /**
   * Creates a new binary search tree
   *
   * @param {number[]} arr - The array to build the tree from
   * @param {boolean} [options.sorted] - Whether the array is sorted, defaults to false
   */
  constructor(arr, options = { sorted: false }) {
    if (!options.sorted) {
      arr = this.sortAndRemoveDuplicates(arr);
    }
    this.root = this.buildFromSortedArray(arr);
  }

  /**
   * Sorts an array of numbers and removes duplicates
   *
   * @param {number[]} arr - The array to sort
   * @returns {number[]} The sorted array
   */
  sortAndRemoveDuplicates(arr) {
    return arr
      .sort((a, b) => a - b)
      .filter((key, index) => arr.indexOf(key) === index);
  }

  /**
   * Build a binary search tree from a sorted array
   *
   * @param {number[]} arr - The sorted array
   * @param {number} [start] - The start index
   * @param {number} [end] - The end index
   * @returns {Node} The root of the binary search tree
   */
  buildFromSortedArray(arr, start = 0, end = arr.length - 1) {
    // base case
    if (start > end) {
      return null;
    }

    const mid = Math.floor((start + end) / 2);
    const root = new Node(arr[mid]);

    // recursively build left subtree
    root.left = this.buildFromSortedArray(arr, start, mid - 1);

    // recursively build right subtree
    root.right = this.buildFromSortedArray(arr, mid + 1, end);

    return root;
  }

  /**
   * Prints the binary search tree in a pretty format
   *
   * @param {Node} [root] - The root of the binary search tree
   * @param {string} [prefix] - The prefix for the current node
   * @param {boolean} [isLeft] - Whether the current node is a left child
   * @returns {void}
   */
  prettyPrint(root = this.root, prefix = "", isLeft = true) {
    if (!root) {
      return;
    }

    if (root.right) {
      this.prettyPrint(
        root.right,
        `${prefix}${isLeft ? "│   " : "    "}`,
        false
      );
    }

    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${root.key}`);

    if (root.left) {
      this.prettyPrint(root.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  /**
   * Inserts a new node into the binary search tree
   *
   * @param {number} key - The key to insert
   * @param {Node} [root] - The root of the binary search tree
   * @returns {Node} The new root of the binary search tree
   */
  insert(key, root = this.root) {
    // base case
    if (!root) {
      return new Node(key);
    }

    if (key < root.key) {
      root.left = this.insert(key, root.left);
    } else if (key > root.key) {
      root.right = this.insert(key, root.right);
    }

    return root;
  }

  /**
   * Removes a node from the binary search tree
   *
   * @param {number} key - The key to remove
   * @param {Node} [root] - The root of the binary search tree
   * @returns {Node} The new root of the binary search tree
   */
  remove(key, root = this.root) {
    // base case
    if (!root) {
      return null;
    }

    if (key < root.key) {
      root.left = this.remove(key, root.left);
    } else if (key > root.key) {
      root.right = this.remove(key, root.right);
    } else {
      // found the node to remove
      // case 1: no children
      if (!root.left && !root.right) {
        return null;
      }

      // case 2: one child
      if (!root.left) {
        return root.right;
      } else if (!root.right) {
        return root.left;
      }

      // case 3: two children
      root.key = this.minkey(root.right);
      root.right = this.remove(root.key, root.right);
    }

    return root;
  }

  /**
   * Returns the minimum key in the binary search tree
   *
   * @param {Node} root - The root of the binary search tree
   * @returns {number} The minimum key
   */
  minkey(root) {
    if (root.left) {
      return this.minkey(root.left);
    }

    return root.key;
  }

  /**
   * Finds a node in the binary search tree
   *
   * @param {number} key - The key to find
   * @param {Node} [root] - The root of the binary search tree
   * @returns {Node} The node with the given key
   */
  find(key, root = this.root) {
    // base case
    if (!root) {
      return null;
    }

    if (key < root.key) {
      return this.find(key, root.left);
    } else if (key > root.key) {
      return this.find(key, root.right);
    }

    return root;
  }

  /**
   * Traverses the binary search tree in level order
   *
   * @param {Function} [callback] - The callback to execute on each node
   * @returns {number[] | void} If no callback is provided, returns an array of keys in level order
   */
  levelOrder(callback = null) {
    const q = new Queue();
    const keys = [];

    q.enqueue(this.root);

    while (!q.isEmpty()) {
      const node = q.dequeue();

      if (callback) {
        callback(node);
      } else {
        keys.push(node.key);
      }

      if (node.left) {
        q.enqueue(node.left);
      }

      if (node.right) {
        q.enqueue(node.right);
      }
    }

    if (!callback) {
      return keys;
    }
  }

  /**
   * Traverses the binary search tree in pre-order
   *
   * @param {Function} [callback] - The callback to execute on each node
   * @param {Node} [root] - The root of the binary search tree
   * @param {number[]} [keys] - The keys in pre-order
   * @returns {number[] | void} If no callback is provided, returns an array of keys in pre-order
   */
  preOrder(callback = null, root = this.root, keys = []) {
    // base case
    if (!root) {
      return;
    }

    // <node> <left> <right>
    if (callback) {
      callback(root);
    } else {
      keys.push(root.key);
    }

    this.preOrder(callback, root.left, keys);
    this.preOrder(callback, root.right, keys);

    if (!callback) {
      return keys;
    }
  }

  /**
   * Traverses the binary search tree in in-order
   *
   * @param {Function} [callback] - The callback to execute on each node
   * @param {Node} [root] - The root of the binary search tree
   * @param {number[]} [keys] - The keys in in-order
   * @returns {number[] | void} If no callback is provided, returns an array of keys in in-order
   */
  inOrder(callback = null, root = this.root, keys = []) {
    // base case
    if (!root) {
      return;
    }

    // <left> <node> <right>
    this.inOrder(callback, root.left, keys);

    if (callback) {
      callback(root);
    } else {
      keys.push(root.key);
    }

    this.inOrder(callback, root.right, keys);

    if (!callback) {
      return keys;
    }
  }

  /**
   * Traverses the binary search tree in post-order
   *
   * @param {Function} [callback] - The callback to execute on each node
   * @param {Node} [root] - The root of the binary search tree
   * @param {number[]} [keys] - The keys in post-order
   * @returns {number[] | void} If no callback is provided, returns an array of keys in post-order
   */
  postOrder(callback, root = this.root, keys = []) {
    // base case
    if (!root) {
      return;
    }

    // <left> <right> <node>
    this.postOrder(callback, root.left, keys);
    this.postOrder(callback, root.right, keys);

    if (callback) {
      callback(root);
    } else {
      keys.push(root.key);
    }

    if (!callback) {
      return keys;
    }
  }

  /**
   * Returns the height of the binary search tree
   *
   * @param {Node} [root] - The root of the binary search tree
   * @returns {number} The height of the binary search tree
   */
  height(root = this.root) {
    // base case
    if (!root) {
      return 0;
    }

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  /**
   * Returns the depth of a node in the binary search tree
   *
   * @param {Node} node - The node to find the depth of
   * @param {Node} [root] - The root of the binary search tree
   * @param {number} [depth] - The depth of the node
   * @returns {number} The depth of the node
   */
  depth(node, root = this.root, depth = 0) {
    // base case
    if (!root) {
      return -1;
    }

    if (node.key < root.key) {
      return this.depth(node, root.left, depth + 1);
    }

    if (node.key > root.key) {
      return this.depth(node, root.right, depth + 1);
    }

    return depth;
  }

  /**
   * Returns the balance factor of the binary search tree
   *
   * @returns {number} The balance factor
   */
  balanceFactor() {
    return this.height(this.root.left) - this.height(this.root.right);
  }

  /**
   * Determines if the binary search tree is balanced
   *
   * @returns {boolean} Whether or not the binary search tree is balanced
   */
  isBalanced() {
    return Math.abs(this.balanceFactor()) <= 1;
  }

  /**
   * Rebalances the binary search tree
   *
   * @returns {void}
   */
  rebalance() {
    const keys = this.inOrder();
    this.root = this.buildFromSortedArray(keys);
  }
}
