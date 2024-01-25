import { sha256 } from "../utils/hash";
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

	// can be private
	add(nodeId: string, name: string, parentNode: Node | null = null): void {
		const newNode = new Node(nodeId, name);
		if (parentNode) {
			parentNode.addChild(newNode);
		}
		this.nodes.push(newNode);
	}

	checkFatherChildRelation(childName: string, parentName: string): boolean {
		const childNodeId = sha256(childName) as string;
		const parentNodeId = sha256(parentName);

		const childNode = this.findNodeById(childNodeId);
		if (!childNode) return false;
		if (childNode.parentNode?.nodeId !== parentNodeId) return false;

		return true;
	}

	checkSiblingsRelation(firstChildName: string, secondChildName: string): boolean {
		const firstChildNodeId = sha256(firstChildName) as string;
		const secondChildNodeId = sha256(secondChildName) as string;
		const firstChildNode = this.findNodeById(firstChildNodeId);
		const secondChildNode = this.findNodeById(secondChildNodeId);

		if (!firstChildNode || !secondChildNode) return false;
		if (firstChildNode.parentNode?.nodeId !== secondChildNode.parentNode?.nodeId) return false;

		return true;
	}

	findSameAncestor(firstChildName: string, secondChildName: string) {
		const firstChildNodeId = sha256(firstChildName) as string;
		const secondChildNodeId = sha256(secondChildName) as string;
		const firstChildNode = this.findNodeById(firstChildNodeId);
		const secondChildNode = this.findNodeById(secondChildNodeId);
		if (!firstChildNode || !secondChildNode) return false;

		function findPathToRoot(node: Node | null) {
			const path: Node[] = [];
			while (node !== null) {
				path.push(node);
				node = node.parentNode;
			}
			return path;
		}

		const path1 = findPathToRoot(firstChildNode);
		const path2 = findPathToRoot(secondChildNode);

		for (let i = 0; i < path1.length; i++) {
			if (path2.includes(path1[i])) {
				return path1[i].nodeId;
			}
		}

		return false;
	}
}
