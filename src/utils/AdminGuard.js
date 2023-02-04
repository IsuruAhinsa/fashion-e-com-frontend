import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const AdminGuard = ({ children }) => {
	const userEmail = useSelector((state) => state.auth.email);

	if (userEmail !== "admin@fashion.com") {
		return (
			<div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
				<h2>Permission Denied.</h2>
				<p>This page can only be view by an Admin user.</p>
				<Link className="text-blue-500 hover:text-blue-700 underline" to="/">
					Back to Home
				</Link>
			</div>
		);
	}

	return children;
};