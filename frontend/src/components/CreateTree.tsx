import React, { useState } from "react";
import { sha256 } from "../utils/hash";

import { Graph } from "react-d3-graph";

const myConfig = {
	automaticRearrangeAfterDropNode: true,
	collapsible: false,
	directed: true,
	// focusZoom: 1,
	freezeAllDragEvents: false,
	highlightDegree: 1,
	highlightOpacity: 0.2,
	linkHighlightBehavior: true,
	maxZoom: 8,
	minZoom: 0.1,
	nodeHighlightBehavior: true,
	panAndZoom: false,
	staticGraph: false,
	staticGraphWithDragAndDrop: false,
	height: window.innerHeight,
	width: window.innerWidth,
	d3: {
		alphaTarget: 0.05,
		gravity: -400,
		linkLength: 300,
		linkStrength: 1,
		disableLinkForce: false,
	},
	node: {
		color: "#d3d3d3",
		fontColor: "black",
		fontSize: 12,
		fontWeight: "normal",
		highlightColor: "red",
		highlightFontSize: 12,
		highlightFontWeight: "bold",
		highlightStrokeColor: "SAME",
		highlightStrokeWidth: 1.5,
		mouseCursor: "pointer",
		opacity: 1,
		renderLabel: true,
		size: 450,
		strokeColor: "none",
		strokeWidth: 1.5,
		svg: "",
		symbolType: "circle",
	},
	link: {
		color: "#d3d3d3",
		fontColor: "red",
		fontSize: 10,
		fontWeight: "normal",
		highlightColor: "blue",
		highlightFontSize: 8,
		highlightFontWeight: "bold",
		mouseCursor: "pointer",
		opacity: 1,
		renderLabel: false,
		semanticStrokeWidth: false,
		strokeWidth: 4,
		markerHeight: 6,
		markerWidth: 6,
		strokeDasharray: 0,
		strokeDashoffset: 0,
		strokeLinecap: "butt",
	},
};

const NODE_SIZE = 1000;

const hashedFatherString = sha256("Father") as string;
const INITIAL_NODE = {
	hashedId: hashedFatherString,
	id: "Father",
	size: NODE_SIZE,
	x: window.innerWidth / 2,
	y: window.innerHeight / 2 - 140,
};
interface Node {
	hashedId: string;
	id: string;
	size: number;
	x?: number;
	y?: number;
}
interface Link {
	source: string;
	target: string;
}

const CreateTree = () => {
	const [nodes, setNodes] = useState<Array<Node>>([INITIAL_NODE]);
	const [links, setLinks] = useState<Array<Link>>([]);

	const addNodeHandler = function (nodeId: string) {
		const nodeName = window.prompt("Enter child name:");
		if (!nodeName) return;
		const hashedNewNodeName = sha256(nodeName) as string;

		const newNode: Node = {
			id: nodeName,
			hashedId: hashedNewNodeName,
			size: NODE_SIZE,
		};
		setNodes((prev) => [...prev, newNode]);
		setLinks((prev) => [...prev, { source: nodeId, target: nodeName }]);
	};

	const createJsonHandler = () => {
		const relationsData = links.map((link) => {
			const sourceNode = nodes.find((node) => node.id === link.source);
			const targetNode = nodes.find((node) => node.id === link.target);
			if (!sourceNode || !targetNode) return null;

			return {
				parentNode: {
					name: sourceNode.id,
					hashedId: sourceNode.hashedId,
				},
				childNode: {
					name: targetNode.id,
					hashedId: targetNode.hashedId,
				},
			};
		});
		const jsonData = JSON.stringify(relationsData);
	};

	return (
		<>
			<div className="button-container">
				<h5>First Step: Create your own JSON file</h5>
				<button onClick={createJsonHandler}>Go to next step</button>
			</div>
			<Graph
				id="graph-id" // id is mandatory
				data={{ nodes, links, focusedNodeId: "Father" }}
				config={myConfig}
				onClickNode={addNodeHandler}
			/>
		</>
	);
};

export default CreateTree;
