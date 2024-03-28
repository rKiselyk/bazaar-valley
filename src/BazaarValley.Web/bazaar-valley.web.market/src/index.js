import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "../src/components/App";
import reportWebVitals from "./reportWebVitals";
import { Provider as ReduxProvider } from "react-redux";
import configureStore, { loadState, saveState } from "./redux/configureStore";

// Importing the Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

const persistedState = loadState();
const store = configureStore(persistedState);

store.subscribe(() => {
	saveState(store.getState());
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<ReduxProvider store={store}>
			<div className="body-container">
				<App />
			</div>
		</ReduxProvider>
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
