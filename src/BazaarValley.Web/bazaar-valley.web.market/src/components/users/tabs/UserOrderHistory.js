import React from "react";

import Accordion from "react-bootstrap/Accordion";

import useFetch from "../../../hooks/useFetch";
import Loader from "../../common/Loader";

function UserOrderHistory({ user }) {
	const { data: orderHistory, loading: loadingOrderHistory } = useFetch(
		`/Orders/${user.id}/history`
	);

	function formatDate(date) {
		return new Date(date).toLocaleDateString("en-US", {
			weekday: "long",
			year: "numeric",
			month: "long",
			day: "numeric"
		});
	}

	if (!user || loadingOrderHistory)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		<div className="d-flex flex-column">
			<label className="fs-2">Order History</label>
			<Accordion defaultActiveKey="0" className="d-flex flex-column mt-3">
				{orderHistory.map((order, index) => {
					return renderOrderRow(order, index);
				})}
			</Accordion>
		</div>
	);

	function renderOrderRow(order, index) {
		return (
			<Accordion.Item key={order.id} eventKey={index}>
				<Accordion.Header className="d-flex">
					<label className="fs-4">
						ID: #{order.id} from {formatDate(order.date)}
					</label>
					<label className="fs-4 ml-auto">
						${order.totalPrice}
						{" - "}
						{order.items.reduce((accumulator, item) => {
							return accumulator + item.quantity;
						}, 0)}{" "}
						Items
					</label>
				</Accordion.Header>
				<Accordion.Body className="d-flex flex-column">
					{order.items.map((item, index) => {
						return (
							<div key={index} className="d-flex my-1">
								<label className="w-50">{item.title}</label>
								<label className="w-25 text-center">
									${item.price}
								</label>
								<label className="w-25 text-center">
									{item.quantity}
								</label>
							</div>
						);
					})}
				</Accordion.Body>
			</Accordion.Item>
		);
	}
}

export default UserOrderHistory;
