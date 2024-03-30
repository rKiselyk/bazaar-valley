import React from "react";
import { Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

const RangeInput = ({ value, setValue, min, max }) => {
	return (
		<InputGroup className="d-flex align-items-center">
			<InputGroup.Text className="bg-transparent border-0">
				{min}
			</InputGroup.Text>

			<Form.Range
				className="w-50 mx-2"
				value={value}
				min={min}
				max={max}
				onChange={(event) => setValue(event.target.value)}
			/>
			<InputGroup.Text className="bg-transparent border-0">
				{max}
			</InputGroup.Text>
		</InputGroup>
	);
};

export default RangeInput;
