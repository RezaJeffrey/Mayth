import { useState } from "react";
import "./App.css";

import { Graph } from "react-d3-graph";
import { sha256 } from "./utils/hash";

const shorten = function (id: string): string {
	return id.substring(0, 10);
};

const allConfig = {
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

const myConfig = {
	...allConfig,
};
interface Node {
	id: string;
	size: number;
	x?: number;
	y?: number;
	originalId: string;
}
interface Link {
	source: string;
	target: string;
}
const NODE_SIZE = 1000;

const hashedFatherString = sha256("Father") as string;
const INITIAL_NODE = {
	originalId: hashedFatherString,
	id: shorten(hashedFatherString),
	size: NODE_SIZE,
	x: window.innerWidth / 2,
	y: window.innerHeight / 2 - 120,
};
function App() {
	const [nodes, setNodes] = useState<Array<Node>>([INITIAL_NODE]);
	const [links, setLinks] = useState<Array<Link>>([]);

	const addNodeHandler = function (nodeId: string) {
		const nodeName = window.prompt("Enter child name:");
		if (!nodeName) return;
		const hashedNewNodeName = sha256(nodeName) as string;
		const shortenHashedNewNodeName = shorten(hashedNewNodeName);

		const newNode: Node = {
			originalId: hashedNewNodeName,
			id: shorten(hashedNewNodeName),
			size: NODE_SIZE,
		};
		setNodes((prev) => [...prev, newNode]);
		setLinks((prev) => [...prev, { source: nodeId, target: shortenHashedNewNodeName }]);
	};

	return (
		<>
			<div className="info">
				<h1>DS Project</h1>
				<h4>Meysam Najafi - Reza Jafari</h4>
				<p className="note">
					<span>NOTE:</span> Click on a node to add child to it
				</p>
			</div>
			<Graph
				id="graph-id" // id is mandatory
				data={{ nodes, links, focusedNodeId: "Father" }}
				config={myConfig}
				onClickNode={addNodeHandler}
			/>
		</>
	);
}

export default App;
