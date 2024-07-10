import LinkedList from "./LinkedList.mjs";
import * as assert from "node:assert";

const list = new LinkedList();

// Test append
list.append("Hello");
list.append("World");

assert.strictEqual(list.toString(), "( Hello ) -> ( World ) -> null");

// Test prepend
list.prepend("!");

assert.strictEqual(list.toString(), "( ! ) -> ( Hello ) -> ( World ) -> null");

// Test size
assert.strictEqual(list.size(), 3);

// Test head
assert.strictEqual(list.head().value, "!");

// Test tail
assert.strictEqual(list.tail().value, "World");

// Test at
assert.strictEqual(list.at(1).value, "Hello");

// Test pop
assert.strictEqual(list.pop().value, "World");

// Test contains
assert.strictEqual(list.contains("Hello"), true);
assert.strictEqual(list.contains("Hello1"), false);

// Test find
assert.strictEqual(list.find("Hello"), 1);

// Test insertAt
list.insertAt("pre", 0);
list.insertAt("Obi-Wan", 2);
list.insertAt("Kenobi", 3);

assert.strictEqual(
  list.toString(),
  "( pre ) -> ( ! ) -> ( Obi-Wan ) -> ( Kenobi ) -> ( Hello ) -> null"
);

// Test removeAt
list.removeAt(0);
list.removeAt(3);

assert.strictEqual(
  list.toString(),
  "( ! ) -> ( Obi-Wan ) -> ( Kenobi ) -> null"
);

console.log("All tests passed");
