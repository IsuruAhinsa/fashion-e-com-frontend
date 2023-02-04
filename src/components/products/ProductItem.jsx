import React from "react";
import { Link } from "react-router-dom";

const ProductItem = ({ product, grid }) => {
	return (
		<div
			className={`group relative ${
				grid ? null : "flex justify-start space-x-6 items-start"
			}`}
		>
			<div
				className={`min-h-80 aspect-w-1 aspect-h-1 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80 ${
					grid ? "w-full" : "w-auto"
				}`}
			>
				<img
					src={product.imageURL}
					alt={product.name}
					className="h-full w-full object-cover object-center lg:h-full lg:w-full"
				/>
			</div>
			<div className="mt-4 flex justify-between">
				<div>
					<h3 className="text-sm text-gray-700">
						<Link to={`product-details/${product.id}`}>
							<span aria-hidden="true" className="absolute inset-0" />
							{product.name}
						</Link>
					</h3>
					{!grid && (
						<p className="text-2xl font-medium text-gray-900">${(product.price).toFixed(2)}</p>
					)}
					<p className="mt-1 text-sm text-gray-500">{product.brand}</p>
					{!grid && (
						<small className="block text-gray-400">{product.description}</small>
					)}
				</div>
				{grid && (
					<p className="text-2xl font-medium text-gray-900">${(product.price).toFixed(2)}</p>
				)}
			</div>
		</div>
	);
};

export default ProductItem;
