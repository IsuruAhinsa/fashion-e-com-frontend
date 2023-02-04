import { CheckCircleIcon } from "@heroicons/react/24/solid";
import useFetchCollection from "../hooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SAVE_ORDERS } from "../slices/orderSlice";
import { Link } from "react-router-dom";
import { ADD_TO_CART } from "../slices/cartSlice";

const OrderHistory = () => {
  const { data } = useFetchCollection("orders");
  const orders = useSelector((state) => state.order.orderHistory);
  const userId = useSelector((state) => state.auth.userId);

  const filteredOrders = orders.filter((order) => order.userId === userId);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SAVE_ORDERS(data));
  }, [dispatch, data]);

  const addToCart = (product) => {
    dispatch(ADD_TO_CART(product));
  };

  return (
    <div className="bg-white">
      <div className="py-16 sm:py-24">
        <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
          <div className="max-w-2xl mx-auto px-4 lg:max-w-4xl lg:px-0">
            <h1 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Order history
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Check the status of recent orders, manage returns, and discover
              similar products.
            </p>
          </div>
        </div>

        <div className="mt-16">
          <h2 className="sr-only">Recent orders</h2>
          <div className="max-w-7xl mx-auto sm:px-2 lg:px-8">
            <div className="max-w-2xl mx-auto space-y-8 sm:px-4 lg:max-w-4xl lg:px-0">
              {filteredOrders.map((order, index) => (
                <div
                  key={index}
                  className="bg-white border-t border-b border-gray-200 shadow-sm sm:rounded-lg sm:border"
                >
                  <h3 className="sr-only">
                    Order placed on{" "}
                    <time dateTime={order.createdAt}>{order.orderDate}</time>
                  </h3>

                  <div className="flex items-center p-4 border-b border-gray-200 sm:p-6 sm:grid sm:grid-cols-4 sm:gap-x-6 bg-gray-100">
                    <dl className="flex-1 grid grid-cols-2 gap-x-6 text-sm sm:col-span-4 sm:grid-cols-4 lg:col-span-4">
                      <div>
                        <dt className="font-medium text-gray-900">
                          Order number
                        </dt>
                        <dd className="mt-1 text-gray-500">{`FAO${
                          order.id
                        }`}</dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">
                          Date placed
                        </dt>
                        <dd className="mt-1 text-gray-500">
                          {order.orderDate}
                        </dd>
                      </div>
                      <div className="hidden sm:block">
                        <dt className="font-medium text-gray-900">
                          Time placed
                        </dt>
                        <dd className="mt-1 text-gray-500">
                          {order.orderTime}
                        </dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">
                          Total amount
                        </dt>
                        <dd className="mt-1 font-medium text-gray-900">
                          ${order.orderAmount.toFixed(2)}
                        </dd>
                      </div>
                    </dl>
                  </div>

                  {/* Products */}
                  <h4 className="sr-only">Items</h4>
                  <ul className="divide-y divide-gray-200">
                    {order.cartItems.map((product) => (
                      <li key={product.id} className="p-4 sm:p-6">
                        <div className="flex items-center sm:items-start">
                          <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden sm:w-40 sm:h-40">
                            <img
                              src={product.imageURL}
                              alt={product.name}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>
                          <div className="flex-1 ml-6 text-sm">
                            <div className="font-medium text-gray-900 sm:flex sm:justify-between">
                              <h5>
                                {product.name} | ({product.cartQuantity})
                              </h5>
                              <p className="mt-2 sm:mt-0">
                                ${product.price.toFixed(2)}
                              </p>
                            </div>
                            <p className="hidden text-gray-500 sm:block sm:mt-2">
                              {product.description}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 sm:flex sm:justify-between">
                          <div className="flex items-center">
                            <CheckCircleIcon
                              className="w-5 h-5 text-green-500"
                              aria-hidden="true"
                            />
                            <p className="ml-2 text-sm font-medium text-gray-500">
                              Delivered on {order.orderDate}
                            </p>
                          </div>

                          <div className="mt-6 border-t border-gray-200 pt-4 flex items-center space-x-4 divide-x divide-gray-200 text-sm font-medium sm:mt-0 sm:ml-4 sm:border-none sm:pt-0">
                            <div className="flex-1 flex justify-center">
                              <Link
                                to={`/product-details/${product.id}`}
                                className="text-indigo-600 whitespace-nowrap hover:text-indigo-500"
                              >
                                View product
                              </Link>
                            </div>
                            <div className="flex-1 pl-4 flex justify-center">
                              <div
                                onClick={() => addToCart(product)}
                                className="text-indigo-600 whitespace-nowrap hover:text-indigo-500 hover:cursor-pointer"
                              >
                                Buy again
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;
