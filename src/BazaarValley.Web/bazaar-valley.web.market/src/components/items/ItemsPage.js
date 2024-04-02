import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import * as categoryActions from "../../redux/actions/categoryActions";
import * as itemActions from "../../redux/actions/itemActions";
import Loader from "../common/Loader";
import FieldFilter from "./FieldFilter";
import GridViewItems from "./item-list/GridViewItems";
import useFetch from "../../hooks/useFetch";
import { NavLink } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Breadcrumb from "react-bootstrap/Breadcrumb";

import RangeInput from "../common/RangeInput";

import "./ItemsPage.css";
import TableRowItems from "./item-list/TableRowItems";

function ItemsPage({ categories, items, loading, actions }) {
	const { categoryId } = useParams();

	const [category, setCategory] = useState({});
	const [selectedFieldValues, setSelectedFieldValues] = useState([]);
	const [maxPrice, setMaxPrice] = useState(undefined);
	const [orderProperty, setOrderProperty] = useState(undefined);
	const [isGridView, setIsGridView] = useState(true);

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

		actions.loadItems(categoryId, []).catch((error) => {
			alert("Loading courses failed" + error);
		});

		const selectedCategory = categories.find(
			(category) => category.id === parseInt(categoryId)
		);

		setCategory(selectedCategory);
	}, []);

	useEffect(() => {
		actions
			.loadItems(categoryId, selectedFieldValues, maxPrice)
			.catch((error) => {
				alert("Loading courses failed" + error);
			});
	}, [categoryId, selectedFieldValues, maxPrice]);

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
						<label className="ml-2 fs-3">({items.length})</label>
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

					<div className="bg-white with-border d-flex w-100">
						<ButtonGroup
							size="lg"
							className="w-100"
							onClick={() => setOrderProperty("")}
						>
							<Button variant="light" className="bg-white">
								<label>POPULAR FIRST</label>
							</Button>
							<Button
								variant="light"
								className="bg-white"
								onClick={() => setOrderProperty("")}
							>
								<label>NEWEST FIRST</label>
							</Button>
							<Button
								variant="light"
								className={
									"bg-white" +
									(orderProperty === "price"
										? "active-sort-button"
										: "")
								}
								onClick={() => {
									setOrderProperty("price");
									actions.sortItems(orderProperty);
								}}
							>
								<label>CHIPEST FIRST</label>
							</Button>
							<Button
								variant="light"
								className={
									"bg-white" +
									(orderProperty === "discount"
										? "active-sort-button"
										: "")
								}
								onClick={() => {
									setOrderProperty("discount");
									actions.sortItems(orderProperty);
								}}
							>
								<label>DISCOUNTS FIRST</label>
							</Button>
							<div className="d-flex ml-auto mx-2">
								<Button
									variant="light"
									className={
										"bg-white" +
										(isGridView ? "active-sort-button" : "")
									}
									onClick={() => {
										setIsGridView(true);
									}}
								>
									<img
										style={{ height: 50 }}
										className="mx-2"
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABaElEQVR4nO3bMW6EMBAF0Dlets79m2yRKmeYNEkRWTJiTcBj3pPoRh8YWwJ2tBEAAAAAAAAAwF7vEfEVEbnzeEbEQ36M9qfx+cJi/B4f8mO0P40cPOTHUH8sSMy1oTZPqP7c/gwHqO+zIFF7Q01/gXmz+s0Ab1mTPdQtyMUL8vznDx/5Oz1+GvvKYrzJj9H+AMBhzEOu7U/DPOTa/jR8GPb5Uo+x346q/dKweUL15/ZnOEB9nwWJ2htq+gvMm9Uv91DM4vnL3VAWz2+YV1zbn4Z5yLX9AYDDmIf0mYfEvtfG6vOc5T6ssnj+cjeUxfM3T6j+3P4MB6jvsyBRe0NNf4F5s/rlHopZPH+5G8ri+Q3zkD7zkLjX/08A4DDmIX3mIfH3TWWLechkH1ZZPH+5G8ri+ZsnVH9uf4YD1PdZkKi9oaa/wLxZ/XIPxSyev9wNZfH8hnlIn3lIzDWvMA8BAAAAAAAAgDjPN8RKvDh3G1mbAAAAAElFTkSuQmCC"
									/>
								</Button>
								<Button
									variant="light"
									className={
										"bg-white" +
										(!isGridView
											? "active-sort-button"
											: "")
									}
									onClick={() => {
										setIsGridView(false);
									}}
								>
									<img
										style={{ height: 50 }}
										className="mx-2"
										src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAABOElEQVR4nO3bMU7DQBQE0DkSxyA1h0JckoIgUVEiSkeRoHZMZHvwvif9apu1R3Ycj5wAAAAAAHBMT0k+k0wzc05y2nuzI/i4IYzfedt7syOYFg4rE0iZuStgbv0lyfcfgp0Gm9dbf4PvCeSh4ECnfzTvAslYgVw9J/kqONjpqLesuWFlAilzXhCKP4YbOP2c6FvCeNxiQwAAAGxLp15Gp17Gy8UyAilzb0GlU8+6BdWSdZ16Ft1hdOoZLJArnXp06ofmKauMTr2MTh0AAGBwOvUyOvUyXi6WEUgZnXo2aQt16tm/stWpZ/+TrlPPwW9Zc8PKBFJGp15Gpw4AADA4nXoZnXoZLxfLCKTMXN8xt+479axbUC1Z9516uipcgaQrkCvfqUenfmiessro1Mvo1AEAAAAAIPe4AEoKoPfgrzWHAAAAAElFTkSuQmCC"
									/>
								</Button>
							</div>
						</ButtonGroup>
					</div>

					<div className="mt-2">
						{isGridView ? (
							<GridViewItems items={items} />
						) : (
							<TableRowItems items={items} />
						)}
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
			sortItems: bindActionCreators(itemActions.sortItems, dispatch),
			loadCategoryFieldsValues: bindActionCreators(
				categoryActions.loadCategoryFieldsValues,
				dispatch
			)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemsPage);
