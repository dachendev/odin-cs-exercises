/** Represents a queue */
export default class Queue {
  /** Creates a new queue */
  constructor() {
    this._head = null;
    this._tail = null;
  }

  /**
   * Adds a value to the end of the queue
   *
   * @param {any} value
   */
  enqueue(value) {
    const node = { value, next: null };

    if (!this._head) {
      this._head = node;
      this._tail = node;
    } else {
      this._tail.next = node;
      this._tail = node;
    }
  }

  /**
   * Removes and returns the first value in the queue
   *
   * @returns {any}
   */
  dequeue() {
    if (!this._head) {
      return null;
    }

    const node = this._head;
    this._head = this._head.next;

    if (!this._head) {
      this._tail = null;
    }

    return node.value;
  }

  /**
   * Checks if the queue is empty
   *
   * @return {boolean} - True if the queue is empty, false otherwise
   */
  isEmpty() {
    return !this._head;
  }
}
