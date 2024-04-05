import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import * as wishlistActions from "../../redux/actions/wishlistActions";
import { useNavigate } from "react-router-dom";

function formatDate(date) {
	return new Date(date).toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}

function WishlistPage({ user, wishlist, categories, actions }) {
	const navigate = useNavigate();

	const [wishlistCategoryItems, setWishlistCategoryItems] = useState([]);
	const [wishlistCategories, setWishlistCategories] = useState([]);
	const [selectedCategory, setselectedCategory] = useState({});

	useEffect(() => {
		actions.loadWishlist(user.id);
	}, []);

	useEffect(() => {
		if (wishlist?.length !== 0) {
			const wc = categories.filter((category) =>
				wishlist.some((item) => item.categoryId === category.id)
			);

			setWishlistCategories(wc);
			setselectedCategory(wc[0]);
			setWishlistCategoryItems(
				wishlist.filter((item) => item.categoryId === wc[0].id)
			);
		}
	}, [wishlist]);

	return (
		<div className="d-flex-flex-column">
			<div className="d-flex flex-column p-5 bg-white with-border">
				<label className="fs-2">
					It`s you personal wishlist, {user.name}
				</label>
			</div>
			<div className="d-flex">
				<div className="d-flex flex-column p-5 bg-white with-border w-25">
					{wishlistCategories.map((category) => {
						return (
							<div
								key={category.id}
								className="p-2 fs-3 cursor-pointer"
								style={{
									borderLeft:
										selectedCategory?.id === category.id
											? "1px solid #0000FF"
											: "1px solid transparent"
								}}
								onClick={() => {
									setselectedCategory(category);
									setWishlistCategoryItems(
										wishlist.filter(
											(item) =>
												item.categoryId === category.id
										)
									);
								}}
							>
								{category.name}
							</div>
						);
					})}
				</div>
				<div className="d-flex flex-column p-5 bg-white with-border w-75">
					{wishlistCategoryItems.map((item) => {
						return (
							<div
								key={item.id}
								className="p-2 d-flex cursor-pointer"
								onClick={() =>
									navigate(
										`/category/${item.categoryId}/items/${item.itemId}`
									)
								}
							>
								<label className="fs-3">{item.title}</label>
								<label className="ml-auto">
									AddedAt: {formatDate(item.addedAt)}
								</label>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

WishlistPage.propTypes = {
	user: PropTypes.object.isRequired,
	categories: PropTypes.array.isRequired,
	wishlist: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		user: state.user,
		categories: state.categories,
		wishlist: state.wishlist
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			loadWishlist: bindActionCreators(
				wishlistActions.getItems,
				dispatch
			),
			deleteItem: bindActionCreators(wishlistActions.deleteItem, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(WishlistPage);
