import React from "react";

import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function ItemsOrder({
	orderProperty,
	isGridView,
	setIsGridView,
	setOrderProperty,
	actions
}) {
	return (
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
					(orderProperty === "price" ? "active-sort-button" : "")
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
					(orderProperty === "discount" ? "active-sort-button" : "")
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
						"bg-white" + (isGridView ? "active-sort-button" : "")
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
						"bg-white" + (!isGridView ? "active-sort-button" : "")
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
	);
}

export default ItemsOrder;
