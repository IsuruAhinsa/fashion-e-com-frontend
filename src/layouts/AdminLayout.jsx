import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { AdminHeader } from "../components";
import { Sidebar } from "../components/admin/Sidebar";
import {
	AddProduct,
	AdminHome,
	OrderDetails,
	Orders,
	Products,
} from "../pages";

const AdminLayout = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
		<>
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
			{/* Content area */}
			<div className="md:pl-64">
				<div className="max-w-4xl mx-auto flex flex-col md:px-8 xl:px-0">
					<AdminHeader setSidebarOpen={setSidebarOpen} />
				</div>

				<main className="flex">
					<div className="w-full px-6">
						<div className="pt-10 pb-16">
							<Routes>
								<Route path="/home" element={<AdminHome />} />
								<Route path="/products" element={<Products />} />
								<Route path="/products/add/:id" element={<AddProduct />} />
								<Route path="orders" element={<Orders />} />
								<Route path="order-details/:id" element={<OrderDetails />} />
							</Routes>
						</div>
					</div>
				</main>
			</div>
		</>
	);
};

export default AdminLayout;
