import { Node } from "./Node";

export class Tree {
	private nodes: Node[] = [];

	findNodeById(nodeId: string): Node | null {
		for (var i = 0; i < this.nodes.length; i++) {
			if (this.nodes[i].nodeId === nodeId) {
				return this.nodes[i];
			}
		}
		return null;
	}

	private add(nodeId: string, name: string, parentNode: Node | null): void {
		const newNode = new Node(nodeId, name);
		if (parentNode) {
			parentNode.addChild(newNode);
		}
		this.nodes.push(newNode);
	}
}
