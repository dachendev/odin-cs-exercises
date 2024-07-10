import HashMap from "./HashMap.mjs";
import * as assert from "node:assert";

// Create a new HashMap with a load factor threshold of 0.75
const hmap = new HashMap({ loadFactorThreshold: 0.75 });

// Populate the HashMap
hmap.set("apple", "red");
hmap.set("banana", "yellow");
hmap.set("carrot", "orange");
hmap.set("dog", "brown");
hmap.set("elephant", "gray");
hmap.set("frog", "green");
hmap.set("grape", "purple");
hmap.set("hat", "black");
hmap.set("ice cream", "white");
hmap.set("jacket", "blue");
hmap.set("kite", "pink");
hmap.set("lion", "golden");

// Get the current load factor
assert.strictEqual(hmap.loadFactor(), 0.75);

// Overwrite the value of an existing key
hmap.set("apple", "green");

// Add a new key-value pair
hmap.set("moon", "silver");

// Get the current capacity and load factor
assert.strictEqual(hmap.capacity, 32);
assert.ok(hmap.loadFactor() < 0.75);

// Test HashMap.get
assert.strictEqual(hmap.get("apple"), "green");
assert.strictEqual(hmap.get("banana"), "yellow");
assert.strictEqual(hmap.get("carrot"), "orange");

// Test HashMap.has
assert.ok(hmap.has("apple"));
assert.ok(!hmap.has("cherry"));

// Test HashMap.remove
hmap.remove("apple");
assert.strictEqual(hmap.get("apple"), null);

// Test HashMap.length
assert.strictEqual(hmap.length(), 12);

// Test HashMap.keys
assert.deepStrictEqual(
  hmap.keys().sort(),
  [
    "banana",
    "carrot",
    "dog",
    "elephant",
    "frog",
    "grape",
    "hat",
    "ice cream",
    "jacket",
    "kite",
    "lion",
    "moon",
  ].sort()
);

// Test HashMap.values
assert.deepStrictEqual(
  hmap.values().sort(),
  [
    "yellow",
    "orange",
    "brown",
    "gray",
    "green",
    "purple",
    "black",
    "white",
    "blue",
    "pink",
    "golden",
    "silver",
  ].sort()
);

// Test HashMap.entries
assert.deepStrictEqual(
  hmap.entries().sort(),
  [
    ["banana", "yellow"],
    ["carrot", "orange"],
    ["dog", "brown"],
    ["elephant", "gray"],
    ["frog", "green"],
    ["grape", "purple"],
    ["hat", "black"],
    ["ice cream", "white"],
    ["jacket", "blue"],
    ["kite", "pink"],
    ["lion", "golden"],
    ["moon", "silver"],
  ].sort()
);

// Test HashMap.clear
hmap.clear();
assert.strictEqual(hmap.get("apple"), null);
assert.strictEqual(hmap.get("banana"), null);
assert.strictEqual(hmap.get("carrot"), null);
assert.strictEqual(hmap.length(), 0);

// All tests passed
console.log("All tests passed");
