/** Represents a queue */
export default class Queue {
  /**
   * Creates a new queue
   */
  constructor() {
    this.items = [];
  }

  /**
   * Adds an item to the end of the queue
   *
   * @param {*} item - The item to enqueue
   * @returns {void}
   */
  enqueue(item) {
    this.items.push(item);
  }

  /**
   * Removes and returns the first item in the queue
   *
   * @returns {*} The first item in the queue
   */
  dequeue() {
    return this.items.shift();
  }

  /**
   * Checks if the queue is empty
   *
   * @returns {boolean} - True if the queue is empty, false otherwise
   */
  isEmpty() {
    return this.items.length === 0;
  }
}
