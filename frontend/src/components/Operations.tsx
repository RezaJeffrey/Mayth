import React, { FC } from "react";
import ReactJson from "react-json-view";

type Props = {
	data: string;
};
const Operations: FC<Props> = ({ data }) => {
	console.log(data);
	return (
		<div className="operations">
			<div className="buttons">
				<button className="button">Check child and parent relation</button>
				<button className="button">Check siblings relation</button>
				<button className="button">Check distant relatives relation</button>
				<button className="button">find same ancestor </button>
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
