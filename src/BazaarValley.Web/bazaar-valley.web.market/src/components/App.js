import Footer from "./footer/Footer";
import Header from "./header/Header";
import HomePage from "./home/HomePage";

import "./App.css";
import PageNotFound from "./common/PageNotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./items/ItemsPage";
import ItemDetailsPage from "./items/item-details/ItemDetailsPage";
import CartPage from "./cart/CartPage";
import UserDetailsPage from "./users/UserDetailsPage";

function App() {
	return (
		<div className="app-container">
			<BrowserRouter>
				<Header />
				<main className="main-container">
					<Routes>
						<Route exect path="/" element={<HomePage />} />
						<Route path="/account" element={<UserDetailsPage />} />
						<Route
							path="/category/:categoryId"
							element={<ItemsPage />}
						/>
						<Route path="/cart" element={<CartPage />} />
						<Route
							path="/category/:categoryId/items/:itemId"
							element={<ItemDetailsPage />}
						/>
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</main>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
