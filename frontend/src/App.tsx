import "./App.css";

import { Graph, GraphNode } from "react-d3-graph";

const data = {
	nodes: [{ id: "Harry", color: "red", size: 600 }, { id: "Sally" }, { id: "Alice" }],
	links: [
		{ source: "Harry", target: "Sally" },
		{ source: "Harry", target: "Alice" },
	],
};
const myConfig = {
	nodeHighlightBehavior: true,
	node: {
		color: "lightgreen",
		size: 500,
		highlightStrokeColor: "blue",
	},
	link: {
		highlightColor: "lightblue",
	},
};
function App() {
	const onClickNode = function (nodeId: any) {
		window.alert(`Clicked node ${nodeId}`);
	};

	const onClickLink = function (source: any, target: any) {
		window.alert(`Clicked link between ${source} and ${target}`);
	};
	return (
		<Graph
			id="graph-id" // id is mandatory
			data={data}
			config={myConfig}
			onClickNode={onClickNode}
			onClickLink={onClickLink}
		/>
	);
}

export default App;
