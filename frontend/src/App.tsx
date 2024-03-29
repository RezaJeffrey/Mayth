import { useState } from "react";
import "./App.css";

import { Graph } from "react-d3-graph";
import { sha256 } from "./utils/hash";
import CreateTree from "./components/CreateTree";
import Operations from "./components/Operations";

function App() {
	const [step, setStep] = useState<number>(1);
	const [jsonData, setJsonData] = useState<string>("");

	const onTreeCreated = (jsonData: string) => {
		setStep(2);
		setJsonData(jsonData);
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
			{step === 1 && <CreateTree onTreeCreated={onTreeCreated} />}
			{step === 2 && <Operations data={jsonData} />}
		</>
	);
}

export default App;
