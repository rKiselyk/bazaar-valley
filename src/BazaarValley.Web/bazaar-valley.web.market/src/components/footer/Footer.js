import React from "react";

function Footer() {
	return (
		<>
			<div className="subscribe d-flex align-items-center justify-content-center flex-column bg-white p-5 with-border">
				<div className="d-flex justify-content-center flex-column">
					<h3 className="text-center">Subscribe to our Newsletter</h3>
					<label className="text-center">
						And get the lastest updates about the products you`ve
						been looking for
					</label>
				</div>
				<div className="d-flex mt-3">
					<input></input>
					<button>SEND</button>
				</div>
			</div>
			<div className="general-info d-flex flex-column bg-white with-border p-5">
				<div className="d-flex w-100">
					<div className="d-flex flex-column general-info-column w-25">
						<label className="general-info-header fw-bold mb-2">
							Policy Info
						</label>
						<label className="general-info-value">
							Privacy Policy
						</label>
						<label className="general-info-value">
							Terms of Sale
						</label>
						<label className="general-info-value">
							Terms of Use
						</label>
					</div>
					<div className="d-flex flex-column general-info-column w-25">
						<label className="general-info-header fw-bold mb-2">
							Company
						</label>
						<label className="general-info-value">About Us</label>
						<label className="general-info-value">
							Core Values
						</label>
						<label className="general-info-value">Career</label>
					</div>
					<div className="d-flex flex-column general-info-column w-25">
						<label className="mb-2 fw-bold">Businnes</label>
						<label className="general-info-value">
							Become a Seller
						</label>
						<label className="general-info-value">Advertise</label>
					</div>
					<div className="d-flex flex-column general-info-column w-25">
						<label className="mb-2 fw-bold">Need Help</label>
						<label className="general-info-value">FAQ</label>
						<label className="general-info-value">
							Help Center
						</label>
						<label className="general-info-value">
							Online Chat
						</label>
					</div>
				</div>
				<div className="text-center fs-5 mt-5">
					Copyright @2024. All Right Reserved
				</div>
			</div>
		</>
	);
}

export default Footer;
