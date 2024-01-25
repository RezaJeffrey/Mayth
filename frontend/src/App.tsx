import { useEffect, useRef, useState } from "react";
import "./App.css";

import { Graph, GraphConfiguration, GraphNode } from "react-d3-graph";

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
}
interface Link {
	source: string;
	target: string;
}
const NODE_SIZE = 1000;

const INITIAL_NODE = {
	id: "Father",
	size: NODE_SIZE,
	x: window.innerWidth / 2,
	y: window.innerHeight / 2 - 120,
};
function App() {
	const [nodes, setNodes] = useState<Array<Node>>([INITIAL_NODE]);
	const [links, setLinks] = useState<Array<Link>>([]);
	const containerRef = useRef();

	const addNodeHandler = function (nodeId: string) {
		const nodeName = window.prompt("Enter child name:");
		if (!nodeName) return;

		const newNode: Node = { id: nodeName, size: NODE_SIZE };
		setNodes((prev) => [...prev, newNode]);
		setLinks((prev) => [...prev, { source: nodeId, target: nodeName }]);
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
