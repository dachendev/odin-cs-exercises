import Node from "./Node.mjs";

/**
 * Represents a linked list data structure.
 *
 * @class
 * @exports default
 */
export default class LinkedList {
  /**
   * Constructs a new linked list.
   */
  constructor() {
    /**
     * The head of the linked list.
     * @type {Node}
     * @private
     */
    this._head = null;
  }

  /**
   * Appends a new node with the given value to the end of the linked list.
   *
   * @param {*} value - The value to store in the new node.
   */
  append(value) {
    const newNode = new Node(value);

    // If the list is empty, set the new node as the head
    if (!this._head) {
      this._head = newNode;
      return;
    }

    // Find the end of the list
    let current = this._head;
    while (current.nextNode) {
      current = current.nextNode;
    }

    current.nextNode = newNode;
  }

  /**
   * Prepends a new node with the given value to the start of the linked list.
   *
   * @param {*} value - The value to store in the new node.
   */
  prepend(value) {
    const newNode = new Node(value);

    // If the list is empty, set the new node as the head
    if (!this._head) {
      this._head = newNode;
      return;
    }

    newNode.nextNode = this._head;
    this._head = newNode;
  }

  /**
   * Returns the size of the linked list.
   *
   * @return {number} - The size of the linked list.
   */
  size() {
    if (!this._head) {
      // If the list is empty, return 0
      return 0;
    }

    let current = this._head;
    let count = 1;

    // Iterate through the list and count the number of nodes
    while (current.nextNode) {
      current = current.nextNode;
      count++;
    }

    return count;
  }

  /**
   * Returns the head of the linked list.
   *
   * @return {Node} - The head of the linked list.
   */
  head() {
    return this._head;
  }

  /**
   * Returns the tail of the linked list.
   *
   * @return {Node} - The tail of the linked list.
   */
  tail() {
    if (!this._head) {
      // If the list is empty, return null
      return null;
    }

    let current = this._head;

    // Find the end of the list
    while (current.nextNode) {
      current = current.nextNode;
    }

    // Return the tail of the linked list
    return current;
  }

  /**
   * Returns the node at the specified index in the linked list.
   *
   * @param {number} index - The index of the node to return.
   * @return {Node|null} - The node at the specified index, or null if it does not exist.
   */
  at(index) {
    if (!this._head) {
      return null;
    }

    let current = this._head;
    let i = 0;

    // Iterate through the linked list until we find the node at the specified index, or until we reach the end of the list.
    while (current) {
      if (i === index) {
        // Return the node at the specified index.
        return current;
      }

      // Move to the next node in the linked list.
      current = current.nextNode;
      i++;
    }

    // If we reached the end of the list without finding the node at the specified index, return null.
    return null;
  }

  /**
   * Removes and returns the last node in the linked list.
   *
   * @return {Node|null} - The last node in the linked list, or null if the linked list is empty.
   */
  pop() {
    // If the linked list is empty, return null.
    if (!this._head) {
      return null;
    }

    // If the linked list has only one node, remove it and return it.
    if (!this._head.nextNode) {
      const node = this._head;
      this._head = null;
      return node;
    }

    // Find the second-to-last node in the linked list.
    let current = this._head;

    // Iterate through the linked list until we find the second-to-last node.
    while (current.nextNode.nextNode) {
      current = current.nextNode;
    }

    // Remove the last node from the linked list and return it.
    const last = current.nextNode;
    current.nextNode = null;
    return last;
  }

  /**
   * Checks if the linked list contains a node with the given value.
   *
   * @param {*} value - The value to search for in the linked list.
   * @return {boolean} - True if the linked list contains a node with the given value, false otherwise.
   */
  contains(value) {
    // If the linked list is empty, return false.
    if (!this._head) {
      return false;
    }

    // Start at the head of the linked list.
    let current = this._head;

    // Iterate through the linked list until we find a node with the given value, or until we reach the end of the list.
    while (current) {
      if (current.value === value) {
        return true;
      }

      current = current.nextNode;
    }

    // If we reached the end of the list without finding a node with the given value, return false.
    return false;
  }

  /**
   * Finds the index of the first node with the given value in the linked list.
   *
   * @param {*} value - The value to search for in the linked list.
   * @return {number|null} - The index of the first node with the given value in the linked list, or null if the linked list does not contain a node with the given value.
   */
  find(value) {
    if (!this._head) {
      // If the linked list is empty, return null.
      return null;
    }

    let current = this._head;
    let i = 0;

    // Iterate through the linked list until we find a node with the given value, or until we reach the end of the list.
    while (current) {
      if (current.value === value) {
        // If we find a node with the given value, return its index.
        return i;
      }

      current = current.nextNode;
      i++;
    }

    // If we reached the end of the list without finding a node with the given value, return null.
    return null;
  }

  /**
   * Inserts a new node with the given value at the specified index in the linked list.
   *
   * @param {*} value - The value to store in the new node.
   * @param {number} index - The index at which to insert the new node.
   * @throws {Error} - If the index is out of bounds.
   */
  insertAt(value, index) {
    if (index === 0) {
      // If the index is 0, prepend the node
      this.prepend(value);
      return;
    }

    const newNode = new Node(value);
    const before = this.at(index - 1);

    if (!before) {
      throw new Error("Index out of bounds");
    }

    // Insert the new node before the node at the specified index
    newNode.nextNode = before.nextNode;
    before.nextNode = newNode;
  }

  /**
   * Removes the node at the specified index from the linked list.
   *
   * @param {number} index - The index of the node to remove.
   * @throws {Error} - If the index is out of bounds.
   */
  removeAt(index) {
    // If the index is 0, remove the head of the linked list
    if (index === 0) {
      this._head = this._head.nextNode;
      return;
    }

    const before = this.at(index - 1);

    if (!before) {
      throw new Error("Index out of bounds");
    }

    // Remove the node by skipping it in the linked list
    before.nextNode = before.nextNode.nextNode;
  }

  /**
   * Returns a string representation of the linked list.
   *
   * @return {string} - A string representation of the linked list.
   */
  toString() {
    // If the linked list is empty, return an empty string.
    if (!this._head) {
      return "";
    }

    let str = "";
    let current = this._head;

    while (current) {
      str += `( ${current.value} ) -> `;
      current = current.nextNode;
    }

    // Append "null" to indicate the end of the linked list.
    str += "null";

    return str;
  }
}
