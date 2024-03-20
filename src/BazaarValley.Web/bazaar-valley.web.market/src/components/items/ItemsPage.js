import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as itemActions from "../../redux/actions/itemActions";
import Loader from "../common/Loader";
import FieldFilter from "./FieldFilter";
import ItemList from "./ItemList";

function ItemsPage({ categories, items, loading, actions }) {
	const { categoryId } = useParams();

	const [category, setCategory] = useState({});

	useEffect(() => {
		if (categories.length === 0) {
			actions.loadCategories().catch((error) => {
				alert("Loading courses failed" + error);
			});
		}
	}, [categories, actions]);

	useEffect(() => {
		if (items.length === 0) {
			actions.loadItems().catch((error) => {
				alert("Loading courses failed" + error);
			});
		}
	}, [categoryId, items, actions]);

	useEffect(() => {
		const selectedCategory = categories.find(
			(category) => category.id === parseInt(categoryId)
		);

		setCategory(selectedCategory);
	}, [categoryId, categories]);

	if (loading || !category)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		<div className="category-items d-flex">
			<div className="w-25 d-flex flex-column">
				{category?.fields?.map((field) => {
					return <FieldFilter key={field.id} {...field} />;
				})}
			</div>
			<div className="w-100 ml-5 d-flex flex-column">
				<div className="d-flex align-items-center">
					<label className="fs-2 text-uppercase">
						{category.name}
					</label>
					<label className="ml-2 fs-3">({items.length})</label>
				</div>

				<div className="mt-2">
					<ItemList items={items} />
				</div>
			</div>
		</div>
	);
}

ItemsPage.propTypes = {
	categories: PropTypes.array.isRequired,
	items: PropTypes.array.isRequired,
	loading: PropTypes.bool.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		categories: state.categories,
		items: state.items,
		loading: state.apiCallsInProgress > 0
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCategories: bindActionCreators(
				categoryActions.loadCategories,
				dispatch
			),
			loadItems: bindActionCreators(itemActions.loadItems, dispatch),
			loadCategoryFieldsValues: bindActionCreators(
				categoryActions.loadCategoryFieldsValues,
				dispatch
			)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
