import Footer from "./footer/Footer";
import Header from "./header/Header";
import HomePage from "./home/HomePage";

import "./App.css";
import PageNotFound from "./common/PageNotFound";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import ItemsPage from "./items/ItemsPage";

function App() {
	return (
		<div className="app-container">
			<BrowserRouter>
				<Header />
				<main className="main-container">
					<Routes>
						<Route exect path="/" element={<HomePage />} />
						<Route
							path="/category/:categoryId"
							element={<ItemsPage />}
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
