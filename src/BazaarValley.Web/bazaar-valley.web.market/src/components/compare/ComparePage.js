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

	useEffect(() => {
		if (categories.length === 0) {
			actions.loadCategories().catch((error) => {
				alert("Loading courses failed" + error);
			});
		}
	}, []);

	useEffect(() => {
		const categoryId = comparisonList[0]?.categoryId;
		debugger;

		if (!categoryId) return;

		const selectedCategory = categories.find(
			(category) => category.id === parseInt(categoryId)
		);

		setCategory(selectedCategory);
	}, [comparisonList]);

	if (!category?.fields || !comparisonList.length) {
		return <label>No items to compare</label>;
	}

	return (
		<div className="d-flex flex-column p-5 bg-white with-border">
			<div className="d-flex">
				<label className="fs-2">Comparison Page</label>
				<label className="ml-auto fs-2">
					{comparisonList.length} Items
				</label>
			</div>
			<div className="d-flex p-5">
				<Table className="comparing-table" borderless>
					<thead>
						<tr>
							<th></th>
							{comparisonList.map((item, index) =>
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
								{comparisonList.map((item, index) =>
									renderItemValue(item, field)
								)}
							</tr>
						))}
						<tr>
							<td></td>
							{comparisonList.map((item, index) => (
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
