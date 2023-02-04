import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PageHeader } from "../../components";
import useFetchCollection from "../../hooks/useFetchCollection";
import { SAVE_ORDERS } from "../../slices/orderSlice";

const Orders = () => {
  const { data } = useFetchCollection("orders");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(SAVE_ORDERS(data));
  }, [dispatch, data]);

  const orders = useSelector((state) => state.order.orderHistory);

  const handleClick = (e, id) => {
    e.preventDefault();
    navigate(`/admin/order-details/${id}`);
  };

  return (
    <>
      <PageHeader title="All Orders" />

      <div className="w-full my-5">
        {orders.length === 0 ? (
          <main className="min-h-full py-36 grid place-items-center">
            <div className="sm:ml-6">
              <div className="sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Orders not yet!
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Don't worry! Please check later.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:pl-6">
                <Link
                  to="/admin/home"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Home
                </Link>
              </div>
            </div>
          </main>
        ) : (
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      S/N
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order Date
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order ID
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order Amount
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Order Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Show More</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {order.orderDate} {order.orderTime}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        FAO{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        ${order.orderAmount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {order.orderStatus.status}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div
                          onClick={(e) => handleClick(e, order.id)}
                          className="text-purple-600 hover:text-purple-900 hover:cursor-pointer"
                        >
                          Show More
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;
