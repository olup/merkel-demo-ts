import { hash } from "../hash";
import { Merckel } from "../merckel";

test("create a Merckel Tree", () => {
  const mTree = new Merckel(["one", "two", "three", "four"]);
  expect(mTree).not.toBeUndefined();
});

test("Check Tree Height", () => {
  const mTree = new Merckel(["one", "two", "three", "four", "five"]);
  expect(mTree.getHeight()).toEqual(4);
});

test("Check Tree Height between even and ofdd number of leaf", () => {
  const mTree = new Merckel(["one", "two", "three", "four", "five"]);
  const mTreeTwo = new Merckel(["one", "two", "three", "four", "five", "six"]);
  expect(mTree.getHeight()).toEqual(mTreeTwo.getHeight());
});

test("Check Level Length", () => {
  const mTree = new Merckel(["one", "two", "three", "four", "five"]);
  expect(mTree.getLevel(0).length).toEqual(5);
});

test("Check hashing of leaf", () => {
  const mTree = new Merckel(["one", "two", "three", "four", "five"]);
  expect(mTree.getNode([0, 0]).getHash()).toEqual(hash("one"));
  expect(mTree.getNode([0, 1]).getHash()).toEqual(hash("two"));
});

test("Check hashing of leaf parent ", () => {
  const mTree = new Merckel(["one", "two", "three", "four", "five"]);
  expect(mTree.getNode([1, 0]).getHash()).toEqual(
    hash(hash("one") + hash("two"))
  );
});

test("Check hashing of root ", () => {
  const mTree = new Merckel(["one", "two", "three", "four"]);
  expect(mTree.getRoot().getHash()).toEqual(
    hash(hash(hash("one") + hash("two")) + hash(hash("three") + hash("four")))
  );
});

test("Check hashing of root when there is an odd number of leaf", () => {
  const mTree = new Merckel(["one", "two", "three", "four", "five"]);
  expect(mTree.getRoot().getHash()).toEqual(
    hash(
      hash(
        hash(hash("one") + hash("two")) + hash(hash("three") + hash("four"))
      ) + hash("five")
    )
  );
});
