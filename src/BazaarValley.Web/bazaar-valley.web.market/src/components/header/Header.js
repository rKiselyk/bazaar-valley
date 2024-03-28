import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes, { func } from "prop-types";
import Loader from "../common/Loader";
import { NavLink } from "react-router-dom";

import { bindActionCreators } from "redux";
import * as userActions from "../../redux/actions/userActions";

import "./Header.css";
import UserLoginModal from "../users/UserLoginModal";
import UserSignUpModal from "../users/UserSignUpModal";

function Header({ cart, user, actions }) {
	const [loginModalShow, setloginModalShow] = useState(false);
	const [signUpModalShow, setsignUpModalShow] = useState(false);

	function handleNavigeteToRegister() {
		setloginModalShow(false);
		setsignUpModalShow(true);
	}

	function handleOnLogin(email, password) {
		actions.userLogin(email, password);
		setloginModalShow(false);
	}

	if (!cart)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	return (
		<header className="header d-flex flex-column fs-5">
			<div className="top-bar d-flex align-self-stretch">
				<div className="small-column bg-white with-border"></div>
				<div className="d-flex align-items-center w-100 bg-white with-border">
					<nav className="help-links">
						<NavLink className="px-3" to="/store">
							Find Store
						</NavLink>
						<NavLink className="px-3" to="/help">
							Help Center
						</NavLink>
						<NavLink className="px-3" to="/chat">
							Live Chat
						</NavLink>
					</nav>
					<nav className="ml-auto utility-links d-flex">
						{user && (
							<NavLink
								className="px-3 d-flex align-items-center"
								to="/order"
							>
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE3klEQVR4nM2aa4hVVRTHf3dyJktJLUjToJysGJJKCssYsYeUYyWVlL3JbxGR0wMsLcz80IcoCoLoYR96isVYqSlWkJY29cmyMtJeRqFjjyHNrjPqjRX/HbvTedx7z+PeP2y456y111pn77XXWnvvC9ljPHAn0AP0Aj+q9epdt3iaFhcCHwGVQBtQC77fBFxAE2E0sNoz8DNgMXCOaCU1+30u8BCwxeNfBRzb6I84HfhOBm0FrpbR1WA68Kn6muudRYNwJrBHhjwNtNYhow14VjL+AM6gYJib/CAD7s1A3n2S9X3RbubWxDMZynQz8xYFRidT+EWd7hTnZlsl+3wKgAuxs2J4RgELlDt2qfXKhUbG9LtSsjeSM9q9EBuFmcCvIXnDtV+Arpj+n4vvRHJEt5RYnoj6iAPieRmYLJdpU155VTTjmREhY4l45uX4Hf+UGBUltjB3cjNxW4yM28WzGxgRQj9P9NfJER9LSViIXODNRBKWxYTu0aLZmsoNO1Q3tcQEAXOhJEyJWdQt0mG6csNOoBxBM1c5VGVIbhNvXwS9DPxMjvhKIzk0hNYn48zIJBwuXgvLQRwpHV+SIz6UkvE5utbJoq0nR7gy4vKYeslCbBKWi3d+CO0q0Z4iR8yTkvtDaCOV7CoKsVG4IyH8LqkihKfGZCl5L4Le5SXEZco3LiFO8WbCeC6JkLFRPLmW9IcB/cBfwBERPDM02lElyu6YjzgKGFQQqHaDljq7XxHDM0L+v0khe6dGen6EOzlcL9kvUACuk7JXcpD9ZkwwyRzDgT+1zY0b3VphZU9Zrmt5phA8n0OF+oBkPk6BmCil2yLqrlrRqpOUQ8ApFIz1+hjbg6TFtZK1kgZgtpSvybD0uZgGYIiOhMwdJqWQM807zCjRINzqHXvWi/clYw4NRKsWfEUjWytmeocZWQSNVHDZ+IMa+5kbfaK+l9IEaAE21xHB5qiPLfSmQZeM+jpi9xhWHbi80UnBKAEdwFzgMWCdTjrGBeqkRVXIekS8L+n5eJ3QrAMelY6OLKOYbZZuBF7TnjxYkh/w7jVs+7tPJf6EhKpgQNcIY/XubOBgiPw+6b4h4ag1dgP1ooq4oOAVGnVLiCcE+i0S39oIuSWvIrgnQDNZsyVjRcjAlWWT2ZaIkyTEdbZR2gDcpalOwlAvHF8TQr9ZtC1VHht1SPeGwIz1yNbInV2/GPfKj+3QulZMk9KfgKMDZfouuWM1Jy1BtMumvbKxP+z8eKJ8232t89168aRk2R7dwc20LeY0GOftUs3m03ziu95dYBaRYrh3SXoTcItX9tsBXFqUZKvJfMcn7NNL3xXSolNu1K82GHGKXy+Okc1m+79wo3cR2WKxt0AfzFj2dMn91n+5UC9/zzjTDlFlvFK/s0KnbK3oOuM/Ct1NrUWcpcBxNB/GyjYXileHDZDF9YeB/WIaUHS4LOPb21rRKht6vP+0lGVrrF0TVBYMev69R19/tzLrsBwNHyYdlvnf9v5dUZFNyxNKoP9hjIS5Et1vNrXbgTeUpLp1gDAVOFXJa5Sag3tuF89UHfZ1S4bJ2h5Rc22WLWZTKozRBmqpdnNhf1vKqu2Xjuek0+4Uc4P5pmVU2xzZvcgTmnLbJdqe5BvgNzVnoHs2mvEYr/WxvnYparJMZl3r8W8q57Krse7F0AAAAABJRU5ErkJggg==" />{" "}
								<label className="ml-2">Track Order</label>
							</NavLink>
						)}
						{user && (
							<NavLink
								className="px-3 d-flex align-items-center"
								to="/wishlist"
							>
								<img src="data:image/png;base64,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" />{" "}
								<label className="ml-2">Wishlist</label>
							</NavLink>
						)}
						<NavLink
							className="px-3 d-flex align-items-center"
							to="/account"
							onClick={(event) => {
								if (!user) {
									event.preventDefault();
								}
							}}
						>
							<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAE3klEQVR4nO2a24vVVRTHP+OoM17IGZ0ms9LulJfpgn9CkQpTGr2UBUGUPdVMPfQQpBARZi/VUPRST5HUS2Z3JEaILK28PNSkU1FeKKx5CJpRx/HEgu+GxZk5v9/e+5wzSfiFwznwW9+192/vtdZea+0DF/D/RQdwJ/ACsBP4ATgJjOljv78H3pdML7CA8wRtwEbgE+AsUEn8GOdj4D7pmna0A08Ax92kTgGDwGZgA7ACWCTZdv1eCdwtmd3Aacc/BvRJdlqwFhh2E/gW2AR0ZujqFPc7p+8IcAdNhK3Uq25AG3xNg3S3aIEOOP2vNMPcLgG+0QCjwONAa6MHAWYC/QoONtZeoLtRyq/UdpviIWBVifx1wDPALuCEfOcfRbGXgGURY94EHNaYhzWHuncivMRXctgie38TmCiJVH8DDwAXlYzdBXztXqa7Hp8I5rQHmF8ge6lWPEz0Ddn8DcBcfSxiPe/C9Jh2yJ7Vwnz3MntzfeY1Z06LShx10EWwpSV6H9S5c0acL0om2OXMbCD1JdY5xy7zibske7LkhauxUmeHcZ8qkb3ZBYDo0DwH+EmkxyLk35KsHZCp6BX31wjZfucvUSb2pDsnYkLsX5K/hnS0aCeNvyQiNB+UrIX/Ugc/nrCF85yD5+Jz6bg9weSPle3K/RK0aBWDKyR/lHzslA4zs5gdDOnMvUWCn0no4chJdLsVykUYMzbdeVTyHxUdaGd1ElttEYNWHYBntFo5COdPT6T8QmXN47XqmfVSaDabgt/Eu4x0zNMinFa0jMXuInN8UQ8tT0rBe+LZeZKK28T9MpG3RTyrNCfhg8wJPSeefafiWXEtVUnBBvGsbJ6EkAbcmKBwhiuyniYdYWWHpSsWK1z6NAl/6mFKmrFEnBHyMSIdlnjGosulRZMQ6ufZCQpnKx+bSIh01ZFyQjpmJfDaXJ+gIS+CuiAV+djqBN5q55c1z4ScFwmmZXE6BbcAf4i7NYG3VZzfpSMFhaYVnN2KoVTcKq41D2IREsDUlzAsL3L23PCLIs5R8a0yLMNal77nZATrxbc8rWEHYkCf+D+XOH6HZCri5GBz0YGYm6IEzHL19ZRbLgy5GjwlUnkMFqUoOUljrbTeQmothC6LyeZgYVnS6FPqRzIHmSv+uQKZc5Ip6p4UYVNMyA6FlRUvOVjgWj21cEoyOVcKLa6wsg5+Yal7IrHQ8bhWXDuTaiGcVyabinWxpa5vPhxQwR+Ly9WNrCi1r4UdrulnnFjMBA7FNh+q20Ex4XGVGmejLvwWOfJSF35Hxe1pRjvIb+FYjUG6tSr7XE/XotH2yBTHZN6u6hPv12QX12hqJzfoqlumPyq3CR2/7Qp9YQIjWlWrEVJhnJddb6yiI+BdpT1o7CO5LdOpmtgDbgXHVZ3d06DLmDZdye1wizShi6U99TaxDRdrR7z5vANcT/OwDHi9ateHdcVRF652zv9LQtumHvS4gGAvcVWjFC/WlUFFt0/9Tbp6a1UzfNSZU907MZXPhAAQTv9G3r5aar/f6R9o9t37VNfTD2Ummh3iVl9Pr2GaMEcmENKZijqGu9Ti6VVbqVNF1wz9Xq5nWyQbbq0qugXom84/DHi0K9H8tM6/cGz8r/7CUctMrEzeBnyoAmpEYXRcv4f0bJtkc+ueC+B8x78fHcKd4U6+1gAAAABJRU5ErkJggg=="></img>
							<label
								className="ml-2 cursor-pointer"
								onClick={() => {
									if (!user) {
										setloginModalShow(true);
									}
								}}
							>
								{user ? `Welcome, ${user.name}` : "Account"}
							</label>
						</NavLink>
						{user && (
							<div
								className="px-3 d-flex align-items-center"
								onClick={() => {
									console.log("userLogout");
									actions.userLogout();
								}}
							>
								<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAACwUlEQVR4nO3cvWoUURjG8T/CxmuI2VuwsbNQ0CiCHzcgtoIhFulsvaZEG3vjoom29jYi2ETjR+PICwPGk3WZGefd85B9/jBddk94f7snm83Jwp/WgMfADPgKNL44OYOYyStgu51VaheAtwag64PwEFjPwghtY9B7RzgAJhkgsU15e2LQDLYyQGbFIrvtFub+bgPYK2a1T0JfikViYTe/aTGrIxIqn4au8rwM0i+DiGUQsQwilkHEMohYBhHLIGIZRCyDiGUQsQwi1hO/l6WNMnp+c/H/UEbPIMN7SkIGEcsgYhlELIOIZZBuXQReAM+BSyRmkG6dPEwYJ3WukJRBuvWhmFUaikG69XDOrALlKiNnkO7tAL+KmR0D1xgxg4yDcp2RMogYikHEUAwihmKQHJTNoXdoEDEUg4ihGCQf5UafOzFIPsq3PigGEUMxiBiKQZaL8gO4s+hGBhFDMYgYikHqotwtv9AgYigGqY/yE7inAvIA+DTn+2hW7PoO3KoNMmlfm9ceRiNyHdcGOd9+E7UH0Yhc1UGi+8BHgWE0lS+JLWtVf6g3i15pGUQIIzJIXYxTv60bRAgjMsjyMeKl/s1/3cAgy8dY+DcRgwhhRAYRwogMko/R6+SJQfIxep3NMogQRmSQPIxBh64NIoQRGUQIIzKIEEZkECGMyCDjYIz2n7gGEcKIDNKt7Tmz8gcHVGoy5zCGP1qjYueAz8vAiLxldes28B54B1wmMYOIZRCxDCKWQcQyyPD8QcpiGClHb/0MGY5hEDEMgwiUvqN4y+qXQcQyiFgGEcsgYhlELIOIZRCxDCKWQcQyyKqBHBULTDMWOSNNi1nF7EZvViyyB2xkLHQGMJ4Vs9pf1ok8X3SawaMMkDXg0Aj0fRC+bk80prQOHBiFrhhv2pmlFtpbwMv2qKS3LU6d5Y3ZxDaV9sz4DaatSIsJ6XXfAAAAAElFTkSuQmCC" />{" "}
								<label className="ml-2 cursor-pointer">
									Logout
								</label>
							</div>
						)}
					</nav>
				</div>
			</div>
			<div className="main-bar d-flex align-self-stretch">
				<div className="small-column bg-white with-border h-100 d-flex align-items-center justify-content-center">
					<NavLink className="px-3" to="/">
						LOGO
					</NavLink>
				</div>
				<div className="d-flex align-items-center w-100 bg-white with-border fs-2">
					<nav className="w-50 d-flex align-items-center">
						<NavLink className="px-3" to="/products">
							PRODUCTS
						</NavLink>
						<NavLink className="px-3" to="/brands">
							BRANDS
						</NavLink>
						<NavLink className="px-3" to="/deals">
							DEALS
						</NavLink>
						<NavLink className="px-3" to="/gifts">
							GIFTS
						</NavLink>
						<NavLink className="px-3" to="/sale">
							SALE
						</NavLink>
					</nav>
					<div className="w-50 pl-3">🔍 SEARCH</div>
				</div>
				<div className="h-100 d-flex align-items-center justify-content-center small-column bg-white with-border fs-1">
					<NavLink className="px-3" to="/cart">
						🛒{" "}
						{cart.reduce((accumulator, item) => {
							return accumulator + item.quantity;
						}, 0)}
					</NavLink>
				</div>
			</div>

			<UserLoginModal
				show={loginModalShow}
				onHide={() => setloginModalShow(false)}
				navigeteToRegister={handleNavigeteToRegister}
				onLogin={handleOnLogin}
			/>

			<UserSignUpModal
				show={signUpModalShow}
				onHide={() => setsignUpModalShow(false)}
				onRegister={(email, password, name) => {
					actions.registerUser(email, password, name);
					setsignUpModalShow(false);
				}}
			/>
		</header>
	);
}

Header.propTypes = {
	cart: PropTypes.array.isRequired,
	actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
		cart: state.cart,
		user: state.user
	};
}

function mapDispatchToProps(dispatch) {
	return {
		actions: {
			userLogin: bindActionCreators(userActions.userLogin, dispatch),
			userLogout: bindActionCreators(userActions.userLogout, dispatch),
			registerUser: bindActionCreators(userActions.registerUser, dispatch)
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
