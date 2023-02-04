import React from "react";
import { BellIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Search from "./Search";

export const Header = ({ setSidebarOpen }) => {
	return (
		<div className="sticky top-0 z-10 flex-shrink-0 h-16 bg-white border-b border-gray-200 flex">
			<button
				type="button"
				className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-purple-500 md:hidden"
				onClick={() => setSidebarOpen(true)}
			>
				<span className="sr-only">Open sidebar</span>
				<Bars3Icon className="h-6 w-6" aria-hidden="true" />
			</button>
			<div className="flex-1 flex justify-between px-4 md:px-0">
				<div className="flex-1 flex">
					<Search />
				</div>
				<div className="ml-4 flex items-center md:ml-6">
					<button
						type="button"
						className="bg-white rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
					>
						<BellIcon className="h-6 w-6" aria-hidden="true" />
						<span className="sr-only">View notifications</span>
					</button>
				</div>
			</div>
		</div>
	);
};
