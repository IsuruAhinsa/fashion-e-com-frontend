import React from "react";

export const Button = ({children, type = "button", disabled = false}) => {
	return (
		<button
			className="focus:ring-2 focus:ring-offset-2 focus:ring-blue-700 text-sm font-semibold leading-none text-white focus:outline-none bg-blue-700 border rounded hover:bg-blue-600 py-4 w-full disabled:bg-gray-500 disabled:cursor-not-allowed"
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
