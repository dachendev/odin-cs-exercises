/** Represents a node in a binary search tree */
export default class Node {
  /**
   * Creates a new Node
   *
   * @param {number} key - The key of the node
   */
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
  }
}
