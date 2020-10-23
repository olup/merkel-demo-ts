export type NodeAddress = [number, number];
type ChildrenAddresses = [NodeAddress, NodeAddress | null];
export class MNode {
  private hash: string;
  private address: NodeAddress;
  private isRoot: boolean;
  private isLeaf: boolean;
  private childrenAddresses: ChildrenAddresses | null;

  constructor(params: {
    hash: string;
    address: NodeAddress;
    isRoot?: boolean;
    childrenAddresses?: ChildrenAddresses;
  }) {
    this.hash = params.hash;
    this.address = params.address;
    this.isRoot = params.isRoot || false;
    this.isLeaf = this.address[0] === 0;
    this.childrenAddresses = params.childrenAddresses || null;
  }

  getHash = () => this.hash;
  getAddress = () => this.address;

  getParentAddress = (): NodeAddress | null => {
    if (this.isRoot) return null;
    return [this.address[0] + 1, Math.floor(this.address[1] / 2)];
  };

  getChildrenAddresses = (): ChildrenAddresses | null => {
    if (this.isLeaf) return null;
    return this.childrenAddresses;
  };
}
