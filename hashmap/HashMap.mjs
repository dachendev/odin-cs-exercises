/** Represents a key-value pair in a linked list */
class Entry {
  /**
   * Create a new Entry
   *
   * @param {string} key
   * @param {*} value
   */
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.next = null;
  }
}

/** Represents a HashMap */
export default class HashMap {
  /**
   * Create a new HashMap
   */
  constructor(options = { loadFactorThreshold: 0.75 }) {
    this.loadFactorThreshold = options.loadFactorThreshold;
    this.capacity = 16;
    this.buckets = new Array(this.capacity);
    this.occupied = 0;
  }

  /**
   * Get the current load factor
   *
   * @returns {number} The current load factor
   */
  loadFactor() {
    return this.occupied / this.capacity;
  }

  /**
   * Resize the HashMap
   */
  resize() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.occupied = 0;

    for (let i = 0; i < oldBuckets.length; i++) {
      let current = oldBuckets[i];

      while (current) {
        this.set(current.key, current.value);
        current = current.next;
      }
    }
  }

  /**
   * Hash a key to an index
   *
   * @param {string} key - The key to hash
   * @returns {number} The index of the bucket
   */
  hash(key) {
    const prime = 31;
    let hashCode = 0;

    for (let i = 0; i < key.length; i++) {
      hashCode = prime * hashCode + key.charCodeAt(i);
    }

    return hashCode % this.capacity;
  }

  /**
   * Set a key and value in the HashMap
   *
   * @param {string} key
   * @param {*} value
   */
  set(key, value) {
    const index = this.hash(key);
    let current = this.buckets[index];
    let previous = null;

    while (current && current.key !== key) {
      previous = current;
      current = current.next;
    }

    if (current) {
      current.value = value;
      return;
    }

    const entry = new Entry(key, value);
    if (!previous) {
      this.buckets[index] = entry;
    } else {
      previous.next = entry;
    }

    this.occupied++;

    if (this.loadFactor() > this.loadFactorThreshold) {
      this.resize();
    }
  }

  /**
   * Get the value of a key in the HashMap
   *
   * @param {string} key - The key to search for
   * @returns {*|null} The value associated with the key, or null if not found
   */
  get(key) {
    const index = this.hash(key);
    let current = this.buckets[index];

    while (current && current.key !== key) {
      current = current.next;
    }

    return current ? current.value : null;
  }

  /**
   * Check if a key exists in the HashMap
   *
   * @param {string} key - The key to search for
   * @returns {boolean} True if the key exists, false otherwise
   */
  has(key) {
    const index = this.hash(key);
    let current = this.buckets[index];

    while (current && current.key !== key) {
      current = current.next;
    }

    return !!current;
  }

  /**
   * Remove a key-value pair from the HashMap
   *
   * @param {string} key - The key to remove
   */
  remove(key) {
    const index = this.hash(key);
    let current = this.buckets[index];
    let previous = null;

    while (current && current.key !== key) {
      previous = current;
      current = current.next;
    }

    if (!current) {
      return;
    }

    if (!previous) {
      this.buckets[index] = current.next;
    } else {
      previous.next = current.next;
    }

    this.occupied--;
  }

  /**
   * Get the number of occupied buckets in the HashMap
   *
   * @returns {number} The number of occupied buckets
   */
  length() {
    return this.occupied;
  }

  /**
   * Remove all key-value pairs from the HashMap
   */
  clear() {
    this.buckets = new Array(this.capacity);
    this.occupied = 0;
  }

  /**
   * Get the keys in the HashMap
   *
   * @returns {Array} The keys in the HashMap
   */
  keys() {
    const keys = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];

      while (current) {
        keys.push(current.key);
        current = current.next;
      }
    }

    return keys;
  }

  /**
   * Get the values in the HashMap
   *
   * @returns {Array} The values in the HashMap
   */
  values() {
    const values = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];

      while (current) {
        values.push(current.value);
        current = current.next;
      }
    }

    return values;
  }

  /**
   * Get the entries in the HashMap
   * @returns {Array<[string, *]>} The entries in the HashMap as an array of key-value pairs
   */
  entries() {
    const entries = [];

    for (let i = 0; i < this.buckets.length; i++) {
      let current = this.buckets[i];

      while (current) {
        entries.push([current.key, current.value]);
        current = current.next;
      }
    }

    return entries;
  }
}
