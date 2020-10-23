import { hash } from "./hash";

type EntryNode = string;

type MNode = {
  hash: string;
  childrenIndexes?: [number, number | null];
  level: number;
};

type Level = MNode[];
type Tree = Level[];

type NodeAddress = [number, number];

const createMerckel = (nodes: EntryNode[]) => {
  let levels: Level[] = [];

  const addNodeToLevel = (
    levelIndex: number,
    node: MNode,
    isLastNode: boolean = false
  ) => {
    /** initialize level if not yet done */
    if (!levels[levelIndex]) levels[levelIndex] = [];
    const thisLevel = levels[levelIndex];

    /** add node to level */
    thisLevel.push(node);

    /** every two nodes, level up the tree */
    if (thisLevel.length % 2 === 0) {
      const parentNode: MNode = {
        hash: hash(node.hash + thisLevel[thisLevel.length - 2].hash),
        childrenIndexes: [thisLevel.length - 2, thisLevel.length - 1],
        level: levelIndex + 1,
      };
      addNodeToLevel(levelIndex + 1, parentNode, isLastNode);

      /** For lone nodes except for the root */
    } else if (isLastNode && thisLevel.length !== 1) {
      const parentNode: MNode = {
        hash: node.hash,
        childrenIndexes: [thisLevel.length - 1, null],
        level: levelIndex + 1,
      };
      addNodeToLevel(levelIndex + 1, parentNode, isLastNode);
    }
  };

  nodes.forEach((n, i) => {
    const hashedNode: MNode = { hash: hash(n), level: 0 };
    addNodeToLevel(0, hashedNode, i === nodes.length - 1);
  });

  return levels;
};

export class Merckel {
  private tree: Tree;

  constructor(nodes: string[]) {
    this.tree = createMerckel(nodes);
  }

  getTree = () => {
    return this.tree;
  };

  getRoot = () => {
    if (!this.tree.length) throw new Error("The tree is empty");
    return this.tree[this.tree.length - 1][0];
  };

  getHeight = () => {
    return this.tree.length;
  };

  getLevel = (index: number) => {
    if (index > this.tree.length - 1)
      throw new Error("This level does not exist on the tree");

    return this.tree[index];
  };

  getNode = (address: NodeAddress) => {
    if (
      address[0] > this.tree.length - 1 ||
      address[1] > this.tree[address[0]].length - 1
    )
      throw new Error("This level does not exist on the tree");

    return this.tree[address[0]][address[1]];
  };
}
