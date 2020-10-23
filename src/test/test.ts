import { hash } from "../hash";
import { Merkel } from "../merkel";

test("create a Merkel Tree", () => {
  const mTree = new Merkel(["one", "two", "three", "four"]);
  expect(mTree).not.toBeUndefined();
});

test("create an empty Merkel Tree", () => {
  const mTree = new Merkel([]);
  expect(mTree).not.toBeUndefined();
});

test("Check Tree Height", () => {
  const mTree = new Merkel(["one", "two", "three", "four", "five"]);
  expect(mTree.getHeight()).toEqual(4);
});

test("Check Tree Height between even and ofdd number of leaf", () => {
  const mTree = new Merkel(["one", "two", "three", "four", "five"]);
  const mTreeTwo = new Merkel(["one", "two", "three", "four", "five", "six"]);
  expect(mTree.getHeight()).toEqual(mTreeTwo.getHeight());
});

test("Check Level Length", () => {
  const mTree = new Merkel(["one", "two", "three", "four", "five"]);
  expect(mTree.getLevel(0).length).toEqual(5);
});

test("Error when requesting out of bound level", () => {
  const mTree = new Merkel(["one", "two", "three", "four", "five"]);
  expect(() => mTree.getLevel(10)).toThrowError();
});

test("Check hashing of leaf", () => {
  const mTree = new Merkel(["one", "two", "three", "four", "five"]);
  expect(mTree.getNode([0, 0]).getHash()).toEqual(hash("one"));
  expect(mTree.getNode([0, 1]).getHash()).toEqual(hash("two"));
});

test("Check hashing of leaf parent ", () => {
  const mTree = new Merkel(["one", "two", "three", "four", "five"]);
  expect(mTree.getNode([1, 0]).getHash()).toEqual(
    hash(hash("one") + hash("two"))
  );
});

test("Check hashing of root ", () => {
  const mTree = new Merkel(["one", "two", "three", "four"]);
  expect(mTree.getRoot().getHash()).toEqual(
    hash(hash(hash("one") + hash("two")) + hash(hash("three") + hash("four")))
  );
});

test("Check hashing of root when there is an odd number of leaf", () => {
  const mTree = new Merkel(["one", "two", "three", "four", "five"]);
  expect(mTree.getRoot().getHash()).toEqual(
    hash(
      hash(
        hash(hash("one") + hash("two")) + hash(hash("three") + hash("four"))
      ) + hash("five")
    )
  );
});

//** Different hash function */

const doHash = (str: string) => str;

test("Check hashing of leaf", () => {
  const mTree = new Merkel(["one", "two", "three", "four", "five"], doHash);
  expect(mTree.getNode([0, 0]).getHash()).toEqual(doHash("one"));
  expect(mTree.getNode([0, 1]).getHash()).toEqual(doHash("two"));
});
