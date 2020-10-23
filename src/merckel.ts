import { hash } from "./hash";
import { MNode, NodeAddress } from "./node";

type EntryNode = string;

type Level = MNode[];
type Tree = Level[];

export class Merckel {
  private tree: Tree = [];

  constructor(nodes: string[]) {
    this.createMerckel(nodes);
  }

  private createMerckel = (nodes: EntryNode[]) => {
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
        const thisNodeIndex = node.getAddress()[1];
        const siblingIndex = thisNodeIndex - 1;

        const parentNodeIndex = levels[levelIndex + 1]
          ? levels[levelIndex + 1].length
          : 0;

        const parentNode = new MNode({
          hash: hash(thisLevel[siblingIndex].getHash() + node.getHash()),
          childrenAddresses: [
            [levelIndex, siblingIndex],
            [levelIndex, thisNodeIndex],
          ],
          address: [levelIndex + 1, parentNodeIndex],
        });

        addNodeToLevel(levelIndex + 1, parentNode, isLastNode);

        /** For lone nodes except for the root */
      } else if (isLastNode && thisLevel.length !== 1) {
        const thisNodeIndex = node.getAddress()[1];
        const parentNodeIndex = levels[levelIndex + 1]?.length || 0;

        const parentNode = new MNode({
          hash: node.getHash(),
          childrenAddresses: [[levelIndex, thisNodeIndex], null],
          address: [levelIndex + 1, parentNodeIndex],
        });
        addNodeToLevel(levelIndex + 1, parentNode, isLastNode);
      }
    };

    nodes.forEach((n, i) => {
      const node = new MNode({ hash: hash(n), address: [0, i] });
      const isLastNode = i === nodes.length - 1;
      addNodeToLevel(0, node, isLastNode);
    });

    this.tree = levels;
  };

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
      throw new Error("This address does not exist on the tree");

    return this.tree[address[0]][address[1]];
  };
}
