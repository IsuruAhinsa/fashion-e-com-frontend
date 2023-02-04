import React, { Fragment } from "react";
import logo from "../../assets/img/2.png";
import { Dialog, Transition } from "@headlessui/react";
import {
	ArrowRightOnRectangleIcon,
	HomeIcon,
	InboxArrowDownIcon,
	QuestionMarkCircleIcon,
	RectangleGroupIcon,
	XMarkIcon,
} from "@heroicons/react/24/outline";
import { NavLink, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/config";
import { signOut } from "firebase/auth";

const navigation = [
	{ name: "Home", to: "home", icon: HomeIcon },
	{ name: "Products", to: "products", icon: RectangleGroupIcon },
	{ name: "Orders", to: "orders", icon: InboxArrowDownIcon },
];

export const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
	const navigate = useNavigate();

	const handleLogout = (event) => {
		event.preventDefault();
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				console.log("Sign-out successful.");
				navigate("/");
			})
			.catch((error) => {
				// An error happened.
				console.error(error.message);
			});
	};

	const secondaryNavigation = [
		{ name: "Help", onClick: "#", icon: QuestionMarkCircleIcon },
		{ name: "Logout", onClick: handleLogout, icon: ArrowRightOnRectangleIcon },
	];

	return (
		<>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-40 flex md:hidden"
					onClose={setSidebarOpen}
				>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
					</Transition.Child>
					<Transition.Child
						as={Fragment}
						enter="transition ease-in-out duration-300 transform"
						enterFrom="-translate-x-full"
						enterTo="translate-x-0"
						leave="transition ease-in-out duration-300 transform"
						leaveFrom="translate-x-0"
						leaveTo="-translate-x-full"
					>
						<div className="relative max-w-xs w-full bg-white pt-5 pb-4 flex-1 flex flex-col">
							<Transition.Child
								as={Fragment}
								enter="ease-in-out duration-300"
								enterFrom="opacity-0"
								enterTo="opacity-100"
								leave="ease-in-out duration-300"
								leaveFrom="opacity-100"
								leaveTo="opacity-0"
							>
								<div className="absolute top-0 right-0 -mr-14 p-1">
									<button
										type="button"
										className="h-12 w-12 rounded-full flex items-center justify-center focus:outline-none focus:bg-gray-600"
										onClick={() => setSidebarOpen(false)}
									>
										<XMarkIcon
											className="h-6 w-6 text-white"
											aria-hidden="true"
										/>
										<span className="sr-only">Close sidebar</span>
									</button>
								</div>
							</Transition.Child>
							<div className="flex-shrink-0 px-4 flex items-center">
								<img className="h-8 w-auto" src={logo} alt="Easywire" />
							</div>
							<div className="mt-5 flex-1 h-0 overflow-y-auto">
								<nav className="h-full flex flex-col">
									<div className="space-y-1">
										{navigation.map((item) => (
											<NavLink
												key={item.name}
												to={item.to}
												className={({ isActive }) =>
													isActive
														? "bg-purple-50 border-purple-600 text-purple-600 group border-l-4 py-2 px-3 flex items-center text-base font-medium"
														: "border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900 group border-l-4 py-2 px-3 flex items-center text-base font-medium"
												}
											>
												<item.icon
													className="mr-4 flex-shrink-0 h-6 w-6"
													aria-hidden="true"
												/>
												{item.name}
											</NavLink>
										))}
									</div>
									<div className="mt-auto pt-10 space-y-1">
										{secondaryNavigation.map((item) => (
											<NavLink
												key={item.name}
												onClick={item.onClick}
												className="group border-l-4 border-transparent py-2 px-3 flex items-center text-base font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:cursor-pointer"
											>
												<item.icon
													className="mr-4 h-6 w-6 text-gray-400 group-hover:text-gray-500"
													aria-hidden="true"
												/>
												{item.name}
											</NavLink>
										))}
									</div>
								</nav>
							</div>
						</div>
					</Transition.Child>
					<div className="flex-shrink-0 w-14" aria-hidden="true">
						{/* Dummy element to force sidebar to shrink to fit close icon */}
					</div>
				</Dialog>
			</Transition.Root>

			{/* Static sidebar for desktop */}
			<div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<nav className="bg-gray-50 border-r border-gray-200 pt-5 pb-4 flex flex-col flex-grow overflow-y-auto">
					<div className="flex-shrink-0 px-4 flex items-center">
						<img className="h-8 w-auto" src={logo} alt="Fashion" />
					</div>
					<div className="flex-grow mt-5">
						<div className="space-y-1">
							{navigation.map((item) => (
								<NavLink
									key={item.name}
									to={item.to}
									className={({ isActive }) =>
										isActive
											? "bg-purple-50 border-purple-600 text-purple-600 group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
											: "border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50 group border-l-4 py-2 px-3 flex items-center text-sm font-medium"
									}
								>
									<item.icon
										className="mr-3 flex-shrink-0 h-6 w-6"
										aria-hidden="true"
									/>
									{item.name}
								</NavLink>
							))}
						</div>
					</div>
					<div className="flex-shrink-0 block w-full">
						{secondaryNavigation.map((item) => (
							<NavLink
								key={item.name}
								onClick={item.onClick}
								className="group border-l-4 border-transparent py-2 px-3 flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-50 hover:cursor-pointer"
							>
								<item.icon
									className="text-gray-400 group-hover:text-gray-500 mr-3 h-6 w-6"
									aria-hidden="true"
								/>
								{item.name}
							</NavLink>
						))}
					</div>
				</nav>
			</div>
		</>
	);
};
