import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";

import "./FieldFilter.css";

function FieldFilter({ id, isPrimary, name }) {
	const [open, setOpen] = useState(isPrimary);

	const randomValue = [
		{ id: 1, name: "name 1" },
		{ id: 2, name: "name 2" },
		{ id: 3, name: "name 3" }
	];

	return (
		<div className="d-flex flex-column p-4 bg-white with-border">
			<div className="d-flex align-items-center mb-2">
				<label className="font-weight-bold text-uppercase fs-4">
					{name}
				</label>

				<Button
					className="ml-auto hide-btn"
					onClick={() => setOpen(!open)}
					aria-controls="example-collapse-text"
					aria-expanded={open}
				>
					{open ? (
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTklEQVR4nO3aSw6CQAwG4P8SJXr/k8gkGl8bXXgcDQkLY5BpOx2mkP4JKyT0s0TmIRCJRKTpAdwAdPCXDsAdwIHz4QuAN4CnM0w31jTUduZcQAAe4wUvAPv6NYpr2mkv3K8RMdVKyWM2tP1UcN6iBpPOvMdDe96sE6UYCwhZIzSYUgjVQkgxJRCqjZBgtJDFEFyMBrI4goORQpohchgJpDliDsOFuEH8e/tyISZvbOt8f7tcyOKdSD835x4cCPdIW4H0FpBIJBJZV5KDn9+0FUiPFQxRPKybbWfQSBNDcS7EzSIg/ZlPcCHwgKGZSZEE0hRDmZmdFNIEQ4zpqQayKIaYc2wtZOoe5hjJQkEJpCpGutpRCqmC0SzZWEBMMdpNlpQZG+XOm270mO0UGaTT1uJuBRDKx+zqpBNznRm20LM5Of/DwA3AsXUhkQhWlg/v63dzB+nQhQAAAABJRU5ErkJggg==" />
					) : (
						<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAABTUlEQVR4nO2ZwQ7CIAyG/5co0fd/El2imXrSg4+DMdlhWYAVaBnTfsniBaSfmNEWwDCMv8ZnPkPFWkPBemxyv/iMHYi8ARyxHQTgWSvymn06tMctYigWmf8arXeGFmsfakSwkQwFJJZxsVhOaClDEYlQXKuEJrSQoYRELK4ksQmaMmsSqbiipCZoyHAkxEWkZbgSKiJSMjkSRSIDM+1wFYdmydyhMh0S35ncnWhGjky3EqG/yg1x7hvnbyy+gT0AXBJjrtOYbiUMwzD2h5tevaeVNKPr16+bHYhjYtyt5wORMtKOLRsaSUpyp2Yy45RK9JbGj8y4qgqrkiw2d2e8dqlbk4rnyHjN5oNEPcGV8VrtIMmiiCOj0qDTqOxoRUa8ZapZnlJCRrSJ3aLGpoiM2LVCy0YBBWTsosd30LIhias37mO3ulC+1TUM48f4ALapXDDipLaHAAAAAElFTkSuQmCC" />
					)}
				</Button>
			</div>
			<Collapse in={open}>
				<div id="example-collapse-text">
					{randomValue.map((value) => {
						return (
							<Form.Check
								key={value.id}
								className="fs-5"
								type="checkbox"
								id={`${name}-${value.id}`}
								label={value.name}
							/>
						);
					})}

					<label className="mt-2">*show only availible items</label>
				</div>
			</Collapse>
		</div>
	);
}

export default FieldFilter;
