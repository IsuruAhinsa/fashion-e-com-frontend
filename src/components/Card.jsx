import React from "react";

export const Card = ({ children }) => {
	return (
		<div className="bg-white shadow-lg rounded xl:w-1/3 lg:w-5/12 md:w-1/2 w-full lg:px-10 px-6 sm:py-10 py-6">
			{children}
		</div>
	);
};
