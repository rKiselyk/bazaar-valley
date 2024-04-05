import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "../common/Loader";

import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Button from "react-bootstrap/Button";

import UserPersonalInfo from "./tabs/userPersonalInfo";
import UserOrderHistory from "./tabs/UserOrderHistory";

function UserDetailsPage({ user }) {
	if (!user)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		// <div className="d-flex">
		// 	<div className="d-flex flex-column bg-white with-border w-25 p-5">
		// 		Selected Page
		// 	</div>
		// 	<div className="d-flex flex-column bg-white with-border w-75 p-5">
		// 		<UserPersonalInfo user={user} />
		// 	</div>
		// </div>

		<Tab.Container id="left-tabs-example" defaultActiveKey="personal-info">
			<Row>
				<Col
					sm={3}
					className="d-flex flex-column bg-white with-border p-5"
				>
					<Nav variant="pills" className="flex-column">
						<Nav.Item>
							<Nav.Link eventKey="personal-info">
								Personal Info
							</Nav.Link>
						</Nav.Item>
						<Nav.Item>
							<Nav.Link eventKey="order-history">
								Order History
							</Nav.Link>
						</Nav.Item>
					</Nav>
					<div className="d-flex flex-column mt-auto">
						<Button className="w-100" variant="link">
							Sign out
						</Button>
						<Button className="w-100 mt-2" variant="danger">
							Delete account
						</Button>
					</div>
				</Col>
				<Col
					sm={9}
					className="d-flex flex-column bg-white with-border p-5"
				>
					<Tab.Content>
						<Tab.Pane eventKey="personal-info">
							<UserPersonalInfo user={user} />
						</Tab.Pane>
						<Tab.Pane eventKey="order-history">
							<UserOrderHistory user={user} />
						</Tab.Pane>
					</Tab.Content>
				</Col>
			</Row>
		</Tab.Container>
	);
}

UserDetailsPage.propTypes = {
	user: PropTypes.object.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		cart: state.cart,
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailsPage);
