import React from "react";

import "./Blockquote.css";

function Blockquote({ text }) {
	return (
		<div class="blockquote mx-5 font-italic">
			<p>{text}</p>
		</div>
	);
}

export default Blockquote;
