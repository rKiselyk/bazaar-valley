import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as comparisonListActions from "../../redux/actions/comparisonListActions";

import "./ComparePage.css";

import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";

function ComparePage({ comparisonList, categories, actions }) {
	const [category, setCategory] = useState({});
	const [itemsToCompare, setitemsToCompare] = useState([]);
	const [categoryWithItems, setCategoryWithItems] = useState([]);

	useEffect(() => {
		if (categories.length === 0) {
			actions.loadCategories().catch((error) => {
				alert("Loading courses failed" + error);
			});
		}
	}, []);

	useEffect(() => {
		setitemsToCompare(
			comparisonList.filter((item) => item.categoryId === category.id)
		);
	}, [category]);

	useEffect(() => {
		const categoryId = comparisonList[0]?.categoryId;
		if (!categoryId) return;

		const selectedCategory = categories.find(
			(category) => category.id === parseInt(categoryId)
		);

		setCategory(selectedCategory);

		const distinctCategoriesWithItemsToCompare = [
			...new Set(comparisonList.map((item) => item.categoryId))
		];
		setCategoryWithItems(
			categories.filter((category) =>
				distinctCategoriesWithItemsToCompare.some(
					(categoryId) => categoryId === category.id
				)
			)
		);
	}, [comparisonList]);

	if (!category?.fields || !comparisonList.length) {
		return (
			<div className="d-flex flex-column p-5 bg-white with-border">
				<label className="fs-2">No items to compare</label>
			</div>
		);
	}

	return (
		<div className="d-flex flex-column p-5 bg-white with-border">
			<div className="d-flex justify-content-between">
				<div className="fs-2">Comparison Page</div>
				<div className="d-flex justify-content-center">
					{categoryWithItems.map((category) => {
						return (
							<Button
								variant="link"
								onClick={() => {
									setCategory(category);
								}}
							>
								{category.name}
							</Button>
						);
					})}
				</div>
				<div className="fs-2">{comparisonList.length} Items</div>
			</div>
			<div className="d-flex p-5">
				<Table className="comparing-table" borderless hover>
					<thead>
						<tr>
							<th></th>
							{itemsToCompare.map((item, index) =>
								renderItemHeader(index, item)
							)}
						</tr>
					</thead>
					<tbody>
						{category.fields.map((field, index) => (
							<tr key={index}>
								<td className="font-weight-bold">
									{field.name}
								</td>
								{itemsToCompare.map((item, index) =>
									renderItemValue(item, field)
								)}
							</tr>
						))}
						<tr>
							<td></td>
							{itemsToCompare.map((item, index) => (
								<td key={item.id}>
									<div className="d-flex flex-column">
										<Button variant="primary" size="sm">
											Add To Cart
										</Button>
										<Button
											className="mt-2"
											variant="secondary"
											size="sm"
											onClick={() =>
												actions.removeFromComparisonList(
													{
														id: item.id
													}
												)
											}
										>
											Remove From Comparison List
										</Button>
									</div>
								</td>
							))}
						</tr>
					</tbody>
				</Table>
			</div>
		</div>
	);

	function renderItemValue(item, field) {
		return (
			<td key={item.id}>
				{item.fields.find(
					(itemField) => itemField.categoryFieldId === field.id
				)?.value || "-"}
			</td>
		);
	}

	function renderItemHeader(index, item) {
		return (
			<th key={index}>
				<div className="d-flex flex-column align-items-center">
					<img style={{ maxWidth: 200 }} src={item.image} />
					<label className="mt-2">{item.title}</label>
				</div>
			</th>
		);
	}
}

ComparePage.propTypes = {
	comparisonList: PropTypes.array.isRequired,
	categories: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		comparisonList: state.comparisonList,
		categories: state.categories
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadCategories: bindActionCreators(
				categoryActions.loadCategories,
				dispatch
			),
			removeFromComparisonList: bindActionCreators(
				comparisonListActions.removeFromComparisonList,
				dispatch
			)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparePage);
