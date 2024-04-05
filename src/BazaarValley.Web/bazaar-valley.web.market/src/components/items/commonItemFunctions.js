export function isInCart(cart, itemId) {
	return cart?.some((cartItem) => cartItem.id === itemId);
}

export function isInWishlist(wishlist, itemId) {
	return wishlist?.some((wishlistItem) => wishlistItem.itemId === itemId);
}

export function isInComparisonList(comparisonList, itemId) {
	return comparisonList?.some(
		(comparisonItem) => comparisonItem.id === itemId
	);
}
