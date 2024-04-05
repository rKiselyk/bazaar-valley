import React from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useNavigate } from "react-router-dom";
import { getImageFromItem } from "./ItemListCommonFunction";

function GridViewItems({ items, cart, wishlist, comparisonList }) {
	const navigate = useNavigate();

	function isInCart(item) {
		return cart?.some((cartItem) => cartItem.id === item.id);
	}
	function isInWishlist(item) {
		return wishlist?.some(
			(wishlistItem) => wishlistItem.itemId === item.id
		);
	}
	function isInComparisonList(item) {
		return comparisonList?.some(
			(comparisonItem) => comparisonItem.id === item.id
		);
	}

	return (
		<Row xs={1} md={4} className="g-4">
			{items.map((item, idx) => {
				return (
					<Col key={idx}>
						<Card
							className={
								"cursor-pointer " +
								(parseInt(item.quantity) === 0
									? "opacity-50"
									: "")
							}
							onClick={() => navigate("items/" + item.id)}
						>
							<Card.Img
								className="p-4"
								variant="top"
								src={getImageFromItem(item.images)}
							/>
							<Card.ImgOverlay>
								<div className="d-flex">
									<div>
										{parseInt(item.quantity) === 0 && (
											<label className="fs-3 font-weight-bold">
												OUT OF STOCK
											</label>
										)}
									</div>
									<div className="ml-auto d-flex flex-column">
										{isInCart(item) && (
											<img
												style={{ height: 25 }}
												className="mb-2"
												src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFE0lEQVR4nO2daYiWVRTHf+M4LWIz7RBNVmSLU0mpINEGUlEJlQR96ENEtC/WtJFRaUiblCX0oQ9BtFFqi2VRRtgCthBEmY59aYdybNomW3RG37hwhZfD9fVd8r3n3Ht/cGAYnnnu+d/zzHOfe597zgOFQqFQKLTGBOBJ4Deg0oSNAkPAAPAMcDnQ3aJP2XIIsKHJQNSyYWAeMDa2QGs8vxOCUW2ryn9LY6zfyQFxtrL8p9TPcI2O/L3Oc3QAewHTgDnAj4Fz3dKAT1nzco2ALG7ynPsAH4lzbfS/L+yAI4FfA8FwT029NM8Bgae2O1o4X1YcBCwB/vC2uMVgbGOuCMhX/vZWiBjoUREUN84UIvK6CMhNMZ0pwFUiIK+WTonLpMCjdGdkn7KmIzD5nBrbqdxZIgJyY2yHcucaEZBXYjuUO0eXcUTfODIogjIltlO584IISH9sh3LnOhGQZbEdyp3JIiBu4bHMRyKPIz+LoBwf06ECvCQCckPplLhcLwLiXo4VInKcCMgvwJiYDuXOGP8msjooLkiFiLjH3TKOKKK/DduOKgbsO+AsFDBFQWdUlNi3KKCzhT3ElcTse5SwXEFnVBTYIyjh5gznI/sDm7U+YU7LcD7SLzSvRhGhcWQyafOZ0Dsb5fu1ZpMuU4XWTcB+KONW4eSLpMujQqt7WaeO6cLJoUTHkV0Crx1mopCxgdyUY0iPC4TG9ZrT/N4Qzl5LekiNC1DMbcLZpaTFgYHd/30o5gTh7IbE8kfmCH0uq0w1oXGkj3RYJ7RdgQFWCKevJg1OFLr+AfbEALf/T4mm2nhc6HoWo1fSYALjyO4+D6Za1+kYmjhtFM4fhW0uEnp+sLYp8G0h4Eps847QMx9j3CkEPIftYj5bqrRsBSZijJNFQH7CLvOElvcwiBtH/hJCXIUJa3T44gjVOi7GKCuFEFcEzRozhAb3sLIHRplr9bm9iqeFhicwzKlCjCvxZInuwG33FAyzq19eqBZ0OHa4TPj+dQITXN4Voi7FDh+kWIrqbiHK3ZMtcISfb2zze4uv9GqeGYElBwvcL/x+i0TYLTCOHIZuOv2FU+3zhSTE+0LcJejmbOGvW+UdR0LMFwJdxW3NLBX+PkZinKZ1y36AvYF/hb9uv1lSjPNbLatFHoqN6hRfkiirjCzQfZpLseh7DKwJHSt8HPG1ipPkDCH2G/TxsPDxNRJmfCDbSLudT+J8qKCT67UhvziaNPcp6Oh6zd2+kudMBR29Ixv1O0z2JQPGi3HEraCWz11E5mNxRZ4X26HcWSACsii2Q7kzUwTk89gO5U63yEDamssAqplPcpuAaecBERCXd1FQtO93MNF8djN0Buo0nhTbqdx5SgSkfO5CWfp0xX+TpBCRNwNBWe5LV7itQj0lOu2l1xc6qyguaOlerGXF9MAAr8lcsk52HBwo6q/FcihVWFfRGk12F5kxIbBvay1wjk8fc3YuMCCO2dzgB5d7A+/162lnk8/EzXYpZa1fhJT0BIq/uO1F9XJvC+04H7NhtRDvrtLtMUsc+0UD7axpoZ2sXhP8KcTXynLtFse6HMB6+buFdlzJqWwYblNHtasd86wxcMtqpB3zLBTiB7azbNLjd6NXH/ugwnbM0xcoLLnOX6Xd3mYFOmmkwbJP7WonCRY1MWFbqLgd83T5TNd6O2mF/xut7SRBl/8gykiNDhrxV2yXgXaSoQ94yD/ZuDmKM/ezG1gnWWvnP7BsUcHthFvoAAAAAElFTkSuQmCC"
											/>
										)}
										{isInComparisonList(item) && (
											<img
												style={{ height: 25 }}
												className="mb-2"
												src="data:image/png;base64,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"
											/>
										)}
										{isInWishlist(item) && (
											<img
												style={{ height: 25 }}
												className="mb-2"
												src="data:image/png;base64,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"
											/>
										)}
									</div>
								</div>
							</Card.ImgOverlay>
							<Card.Body>
								<Card.Title>{item.title}</Card.Title>
								<Card.Text>
									<label className="fs-4">
										Price:{" "}
										{item.discount && (
											<del>${item.originPrice}</del>
										)}{" "}
										${item.price}
									</label>
								</Card.Text>
							</Card.Body>
							<Card.Footer>
								<small className="text-muted">
									/* TODO Ratings: 4.5* Comments: 15 */
								</small>
							</Card.Footer>
						</Card>
					</Col>
				);
			})}
		</Row>
	);
}

export default GridViewItems;
