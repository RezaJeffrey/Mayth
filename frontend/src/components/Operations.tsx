import React, { FC, useEffect, useState } from "react";
import ReactJson from "react-json-view";
import { Tree } from "../models/Tree";

type Props = {
	data: string;
};
const Operations: FC<Props> = ({ data }) => {
	const [tree, setTree] = useState<null | Tree>(null);

	useEffect(() => {
		const parsedData = JSON.parse(data);
		const rootNode = parsedData[0].parentNode;
		if (!rootNode) return;

		// add root node
		const newTree = new Tree();
		newTree.add(rootNode.hashedId, rootNode.name);

		for (let i = 0; i < parsedData.length; i++) {
			const { parentNode: parentNodeRaw, childNode: childNodeRaw } = parsedData[i];
			const parentNodeHashedId = parentNodeRaw.hashedId;

			const parentNode = parentNodeHashedId ? newTree.findNodeById(parentNodeHashedId) : null;
			newTree.add(childNodeRaw.hashedId, childNodeRaw.name, parentNode);
		}
		setTree(newTree);
	}, []);

	useEffect(() => {
		console.log(tree);
	}, [tree]);

	const childParentHandler = () => {
		const child = prompt("Enter child name");
		const parent = prompt("Enter parent name");
		if (!child || !parent) return;

		const res = tree?.checkFatherChildRelation(child, parent);
		if (res) {
			alert("They have child-parent relation");
		} else {
			alert("They don't have child-parent relation");
		}
	};

	const siblingsHandler = () => {
		const firstChild = prompt("Enter first child name");
		const secondChild = prompt("Enter second child name");
		if (!firstChild || !secondChild) return;

		const res = tree?.checkSiblingsRelation(firstChild, secondChild);
		if (res) {
			alert("They have sibling relation");
		} else {
			alert("They don't have sibling relation");
		}
	};

	const findSameAncestorHandler = () => {
		const firstChild = prompt("Enter first child name");
		const secondChild = prompt("Enter second child name");
		if (!firstChild || !secondChild) return;

		const res = tree?.findSameAncestor(firstChild, secondChild);
		if (res) {
			alert(res);
		} else {
			alert("Not found.");
		}
	};

	return (
		<div className="operations">
			<div className="buttons">
				<button onClick={childParentHandler} className="button">
					Check child and parent relation
				</button>
				<button onClick={siblingsHandler} className="button">
					Check siblings relation
				</button>
				<button className="button">Check distant relatives relation</button>
				<button className="button" onClick={findSameAncestorHandler}>
					find same ancestor{" "}
				</button>
				<button className="button">find furthest child</button>
				<button className="button">find furthest relation</button>
			</div>
			<div className="viewer">
				<h5>JSON VIEWER FOR YOUR BETTER UNDERSTANDING FROM RELATIONS</h5>
				<ReactJson theme="google" src={JSON.parse(data)} />
			</div>
		</div>
	);
};

export default Operations;
