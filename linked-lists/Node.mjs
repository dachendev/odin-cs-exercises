/**
 * Represents a node in a linked list.
 * @class
 * @exports default
 */
export default class Node {
  /**
   * Creates a new node.
   * @constructor
   * @param {*} value - The value to store in the node. Defaults to null.
   */
  constructor(value = null) {
    /**
     * The value stored in the node.
     * @type {*}
     */
    this.value = value;

    /**
     * The next node in the linked list.
     * @type {Node|null}
     */
    this.nextNode = null;
  }
}
