import React, { useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import Loader from "../../../common/Loader";

import Blockquote from "../../../common/blockquote/Blockquote";

import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import ItemCommentModal from "./ItemCommentModal";

function formatDate(date) {
	return new Date(date).toLocaleDateString("en-US", {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric"
	});
}

function ItemComments({ itemId, comments, addComment }) {
	const [open, setOpen] = useState(false);
	const [openAddCommentModal, setOpenAddCommentModal] = useState(false);

	if (!comments)
		return (
			<div className="d-flex align-items-center justify-content-center">
				<Loader />
			</div>
		);

	console.log(
		comments.reduce((r, c) => {
			return r + (c.rating || 0);
		}, 0)
	);
	console.log(comments.length);
	return (
		<div className="d-flex flex-column comments-container">
			<div className="d-flex">
				<div>
					<label className="fs-2">Comments and Reviews</label>
					<label className="ml-2">
						(Comments: {comments.length} Avg. Raiting:{" "}
						{(
							comments.reduce((r, c) => {
								return r + (c.rating || 0);
							}, 0) / comments.length
						).toFixed(2)}
						)
					</label>
				</div>
				<div className="ml-auto bg-white">
					<Button variant="light" onClick={() => setOpen(!open)}>
						{open ? "Hide" : "Show"} details
					</Button>

					<Button
						variant="primary"
						className="ml-2"
						onClick={() => setOpenAddCommentModal(true)}
					>
						Add Comment
					</Button>
				</div>
			</div>
			<Collapse in={open}>
				<div className="mt-2">
					{comments?.map((comment) => {
						return renderItemCommentRow(comment);
					})}
				</div>
			</Collapse>

			<ItemCommentModal
				show={openAddCommentModal}
				onHide={() => setOpenAddCommentModal(false)}
				onComment={(content, rating) => {
					setOpenAddCommentModal(false);
					addComment(content, rating);
				}}
			/>
		</div>
	);

	function renderItemCommentRow(comment) {
		return (
			<div className="d-flex flex-column mb-3">
				<div className="d-flex mb-2  fs-4 ">
					<div className="fs-4">
						Comment by{" "}
						<label className="font-weight-bold">
							{comment.user.name}
						</label>{" "}
						<label>({comment.user.email})</label> and set rating to{" "}
						<label className="font-weight-bold">
							{comment.rating}
						</label>{" "}
						at{" "}
						<label className="font-weight-bold">
							{formatDate(comment.createdAt)}
						</label>
					</div>
				</div>

				<div className="fs-4">
					<Blockquote text={comment.content} />
				</div>
			</div>
		);
	}
}

export default ItemComments;
