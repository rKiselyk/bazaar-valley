import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as itemActions from "../../redux/actions/itemActions";
import Loader from "../common/Loader";
import FieldFilter from "./field-filter/FieldFilter";
import GridViewItems from "./item-list/GridViewItems";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import RangeInput from "../common/RangeInput";

import "./ItemsPage.css";
import TableRowItems from "./item-list/TableRowItems";
import ItemsOrder from "./items-order/ItemsOrder";
import AppPagination from "../common/Pagination";

function ItemsPage({
	categories,
	items,
	wishlist,
	comparisonList,
	cart,
	actions
}) {
	const { categoryId } = useParams();

	const [category, setCategory] = useState({});
	const [selectedFieldValues, setSelectedFieldValues] = useState([]);
	const [maxPrice, setMaxPrice] = useState(undefined);
	const [isGridView, setIsGridView] = useState(true);

	const [sorting, setSorting] = useState({
		property: "CreatedAt",
		isAsc: true
	});

	const [currentPage, setCurrentPage] = useState(1);
	const pageSize = 20;

	const {
		data: availibleFilters,
		error,
		loading: loadingFieldsValues
	} = useFetch(`/Categories/${categoryId}/available-filters`);

	useEffect(() => {
		if (categories.length === 0) {
			actions.loadCategories().catch((error) => {
				alert("Loading courses failed" + error);
			});
		}

		actions.loadItems(categoryId, [], null, pageSize, 0).catch((error) => {
			alert("Loading courses failed" + error);
		});

		const selectedCategory = categories.find(
			(category) => category.id === parseInt(categoryId)
		);

		setCategory(selectedCategory);
	}, []);

	useEffect(() => {
		actions
			.loadItems(
				categoryId,
				selectedFieldValues,
				maxPrice,
				pageSize,
				currentPage - 1,
				sorting
			)
			.catch((error) => {
				alert("Loading courses failed" + error);
			});
	}, [categoryId, selectedFieldValues, maxPrice, currentPage, sorting]);

	if (error) {
		alert(error);
		return;
	}

	if (!category || loadingFieldsValues)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		<div className="category-items d-flex flex-column">
			<div className="d-flex">
				<Breadcrumb>
					<Breadcrumb.Item>
						<NavLink className="px-3" to="/">
							HOME
						</NavLink>
					</Breadcrumb.Item>
					<Breadcrumb.Item active>
						<label className="px-3">{category.name}</label>
					</Breadcrumb.Item>
				</Breadcrumb>
			</div>
			<div className="d-flex">
				<div className="w-25 d-flex flex-column">
					<div className="d-flex flex-column p-4 bg-white with-border">
						<Form.Label className="font-weight-bold text-uppercase fs-4">
							PRICE
						</Form.Label>
						<RangeInput
							value={maxPrice}
							max={availibleFilters.maxPrice}
							setValue={(value) => setMaxPrice(parseInt(value))}
						/>
						<Form.Label className="text-uppercase mt-2">
							Selected max price: ${maxPrice}
						</Form.Label>
					</div>
					{availibleFilters.fieldValues?.map((fieldValues) => {
						return (
							<FieldFilter
								key={fieldValues.field.id}
								selectedFieldValues={selectedFieldValues}
								setSelectedFieldValues={setSelectedFieldValues}
								{...fieldValues}
							/>
						);
					})}
				</div>
				<div className="w-100 ml-5 d-flex flex-column">
					<div className="d-flex align-items-center">
						<label className="fs-2 text-uppercase">
							{category.name}
						</label>
						<label className="fs-2 ml-2 text-uppercase">
							({items.totalItemNumber})
						</label>
						<div className="ml-5 w-100 f-flex align-items-center">
							{maxPrice && (
								<div className="ml-2 p-2 bg-white d-inline-block">
									Max price: ${maxPrice}
								</div>
							)}
							{selectedFieldValues.map((selectedFieldValue) => {
								return (
									<div
										key={selectedFieldValue.value}
										className="ml-2 p-2 bg-white d-inline-block"
									>
										{selectedFieldValue.value}
									</div>
								);
							})}
						</div>
					</div>

					<div className="bg-white with-border d-flex w-100 mb-2">
						<ItemsOrder
							sorting={sorting}
							setSorting={setSorting}
							isGridView={isGridView}
							setIsGridView={setIsGridView}
							actions={actions}
						/>
					</div>

					<div className="mb-2">
						{isGridView ? (
							<GridViewItems
								items={items.items}
								cart={cart}
								wishlist={wishlist}
								comparisonList={comparisonList}
							/>
						) : (
							<TableRowItems
								items={items.items}
								cart={cart}
								wishlist={wishlist}
								comparisonList={comparisonList}
							/>
						)}
					</div>
					<div className="d-flex justify-content-center p-3">
						<AppPagination
							itemsCount={items.totalItemNumber}
							itemsPerPage={pageSize}
							currentPage={currentPage}
							setCurrentPage={setCurrentPage}
							alwaysShown={false}
						/>
					</div>
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
		wishlist: state.wishlist,
		comparisonList: state.comparisonList,
		cart: state.cart,
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
