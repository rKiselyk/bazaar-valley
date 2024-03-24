import React, { useEffect, useState } from "react";
import Carousel from "react-bootstrap/Carousel";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import Loader from "../common/Loader";
import { useNavigate } from "react-router-dom";

function HomePage({ categories, loading, actions }) {
	const [index, setIndex] = useState(0);

	const navigate = useNavigate();

	useEffect(() => {
		if (categories.length === 0) {
			actions.loadCategories().catch((error) => {
				alert("Loading courses failed" + error);
			});
		}
	}, []);

	const handleSelect = (selectedIndex) => {
		setIndex(selectedIndex);
	};

	const renderCategoryItem = (category) => {
		return (
			<Carousel.Item key={category.id}>
				<div
					style={{
						height: 150,
						backgroundColor: "white"
					}}
					onClick={() => navigate("/category/" + category.id)}
					className="d-flex pt-4 justify-content-center"
					// eslint-disable-next-line react/jsx-no-comment-textnodes
				>
					/* Image picture at the background */
				</div>
				<Carousel.Caption>
					<h3>{category.name}</h3>
				</Carousel.Caption>
			</Carousel.Item>
		);
	};

	if (loading)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		<div>
			<div className="fs-1 d-flex align-items-center flex-column justify-content-center p-5">
				<label>Welcome to BazzarValley</label>
				<label className="fs-3">Select category to continue </label>
			</div>
			<Carousel
				data-bs-theme="dark"
				activeIndex={index}
				onSelect={handleSelect}
			>
				{categories.map((category) => renderCategoryItem(category))}
			</Carousel>
		</div>
	);
}

HomePage.propTypes = {
	categories: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		categories: state.categories,
		loading: state.apiCallsInProgress > 0
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCategories: bindActionCreators(
				categoryActions.loadCategories,
				dispatch
			)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
