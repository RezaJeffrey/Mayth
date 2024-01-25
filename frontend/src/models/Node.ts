export class Node {
	children: Node[] = [];
	nodeId: null | string = null;
	private name: null | string = null;
	parentNode: null | Node = null;

	constructor(nodeId: string, name: string) {
		this.nodeId = nodeId;
		this.name = name;
	}

	setParent(parentNode: Node) {
		this.parentNode = parentNode;
	}

	addChild(node: Node) {
		this.children.push(node);
		node.setParent(this);
	}
}
