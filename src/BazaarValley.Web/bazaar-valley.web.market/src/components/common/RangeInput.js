import React, { useState } from "react";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

const RangeInput = ({ min, max, label }) => {
	const [value, setValue] = useState((min + max) / 2); // Initializes with the average of min and max

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<InputGroup>
			<InputGroup.Text>{min}</InputGroup.Text>

			<Form.Range
				value={value}
				min={min}
				max={max}
				onChange={handleChange}
			/>
			<InputGroup.Text>{max}</InputGroup.Text>
		</InputGroup>
	);
};

export default RangeInput;
