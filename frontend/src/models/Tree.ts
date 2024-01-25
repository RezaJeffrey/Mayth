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

	findPathToRoot(node: Node | null) {
		const path: Node[] = [];
		while (node !== null) {
			path.push(node);
			node = node.parentNode;
		}
		return path;
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

		const path = this.findPathToRoot(childNode);
		if (!childNode) return false;
		const isChild = path.find((id) => id.nodeId === parentNodeId);
		return Boolean(isChild);
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

	// 2 nodes have distant relation if they have same parents up to 3 level
	checkDistantRelation(firstChildName: string, secondChildName: string) {
		const firstChildNodeId = sha256(firstChildName) as string;
		const secondChildNodeId = sha256(secondChildName) as string;
		const firstChildNode = this.findNodeById(firstChildNodeId);
		const secondChildNode = this.findNodeById(secondChildNodeId);
		if (!firstChildNode || !secondChildNode) return false;

		const path1 = this.findPathToRoot(firstChildNode).slice(0, 4);
		const path2 = this.findPathToRoot(secondChildNode).slice(0, 4);

		for (let i = 0; i < path1.length; i++) {
			if (path2.includes(path1[i])) {
				return true;
			}
		}

		return false;
	}

	findSameAncestor(firstChildName: string, secondChildName: string) {
		const firstChildNodeId = sha256(firstChildName) as string;
		const secondChildNodeId = sha256(secondChildName) as string;
		const firstChildNode = this.findNodeById(firstChildNodeId);
		const secondChildNode = this.findNodeById(secondChildNodeId);
		if (!firstChildNode || !secondChildNode) return false;

		const path1 = this.findPathToRoot(firstChildNode);
		const path2 = this.findPathToRoot(secondChildNode);

		for (let i = 0; i < path1.length; i++) {
			if (path2.includes(path1[i])) {
				return path1[i].nodeId;
			}
		}

		return false;
	}

	findFurthestChild(nodeId: string | null): number {
		if (!nodeId) return 0;
		const node = this.findNodeById(nodeId);
		if (!node) return 0;

		if (node.children.length === 0) {
			return 0; // Base case: leaf node
		}

		let maxChildDepth = 0;

		for (const child of node.children) {
			const childDepth = 1 + this.findFurthestChild(child.nodeId);
			if (childDepth > maxChildDepth) {
				maxChildDepth = childDepth;
			}
		}

		return maxChildDepth;
	}
	bfs(node: Node): [Node, number] | false {
		if (!node) return false;

		const visited: Node[] = [node];
		let p: Node = node;
		let maxDistance: number = 0;
		const queue: [Node, number][] = [];
		queue.push([node, 0]);
		while (queue.length > 0) {
			const s: [Node, number] = queue.shift()!;
			if (s[1] > maxDistance) {
				maxDistance = s[1];
				p = s[0];
			}
			for (const child of s[0].children.concat(s[0].parentNode ? [s[0].parentNode] : [])) {
				if (child && !visited.includes(child)) {
					visited.push(child);
					queue.push([child, s[1] + 1]);
				}
			}
		}
		return [p, maxDistance];
	}
	getLeaves(): Node[] {
		const leaves: Node[] = [];
		for (const node of this.nodes) {
			if (node.children.length === 0) {
				leaves.push(node);
			}
		}
		return leaves;
	}
	findLongestPath(): [string, string, number] | false {
		const rootNodeId = sha256("Father");
		const rootNode = this.nodes.find((node) => node.nodeId === rootNodeId);
		if (!rootNode) return false;

		let longestPath: number = 0;
		let p: Node = rootNode;
		let leaf: Node | null = null;
		for (const l of this.getLeaves()) {
			const path = this.bfs(l);
			if (!path) break;
			if (path[1] > longestPath) {
				longestPath = path[1];
				p = path[0];
				leaf = l;
			}
			return [p.nodeId as string, leaf ? (leaf.nodeId as string) : "", longestPath];
		}
		return false;
	}
}
