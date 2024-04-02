import React from "react";
import { useNavigate } from "react-router-dom";
import { getImageFromItem } from "./ItemListCommonFunction";

function TableRowItems({ items }) {
	const navigate = useNavigate();

	return (
		<div className="d-flex flex-column">
			{items.map((item) => {
				return (
					<div
						className={
							"d-flex mb-2 align-items-center bg-white with-border p-2 cursor-pointer " +
							(parseInt(item.quantity) === 0 ? "opacity-50" : "")
						}
						onClick={() => navigate("items/" + item.id)}
					>
						<div className="w-50">
							<div className="d-flex align-items-center">
								<img src={getImageFromItem(item.images)} />
								<label className="ml-5 fs-3">
									{item.title}
								</label>
							</div>
						</div>

						<div className="w-25">
							<label className="fs-4 text-center w-100">
								{item.discount && (
									<del>${item.originPrice}</del>
								)}{" "}
								${item.price}
							</label>
						</div>

						<div className="w-25 d-flex flex-column justify-content-center">
							<label className="text-center w-100">
								Ratings: 4.5*
							</label>
							<label className="text-center w-100">
								Comments: 15
							</label>
						</div>
					</div>
				);
			})}
		</div>
	);
}

export default TableRowItems;
