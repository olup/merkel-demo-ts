import { Merkel } from "./merkel";

const mTreeOne = new Merkel(["one", "two", "three", "four"]);
const mTreeTwo = new Merkel(["one", "two", "three", "four", "five"]);

//console.log(JSON.stringify(mTreeTwo.getTree(), null, 2));

console.log(mTreeOne.getRoot());
console.log(mTreeTwo.getNode([2, 1]));
console.log(mTreeTwo.getHeight());
console.log(mTreeOne.getLevel(1));
