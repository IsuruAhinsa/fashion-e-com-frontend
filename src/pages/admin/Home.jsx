import React from "react";
import InfoCardBox from "../../components/admin/InfoCardBox";
import {
  ScaleIcon,
  ShoppingBagIcon,
  ArrowPathRoundedSquareIcon,
} from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SAVE_ORDERS, TOTAL_ORDER_AMOUNT } from "../../slices/orderSlice";
import useFetchCollecttion from "../../hooks/useFetchCollection";
import ShippingStatusBarChart from "../../components/admin/ShippingStatusBarChart";

const Home = () => {
  const earningsIcon = (
    <ScaleIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
  );

  const productsIcon = (
    <ShoppingBagIcon className="h-6 w-6 text-gray-400" aria-hidden="true" />
  );

  const ordersIcon = (
    <ArrowPathRoundedSquareIcon
      className="h-6 w-6 text-gray-400"
      aria-hidden="true"
    />
  );

  const { data } = useFetchCollecttion("orders");

  const totalOrderAmount = useSelector((state) => state.order.orderAmount);
  const products = useSelector((state) => state.product.products);
  const orders = useSelector((state) => state.order.orderHistory);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SAVE_ORDERS(data));
    dispatch(TOTAL_ORDER_AMOUNT());
  }, [dispatch, data]);

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg leading-6 font-medium text-gray-900">
          Overview
        </h2>
        <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <InfoCardBox
            title="Earnings"
            count={`$${totalOrderAmount.toFixed(2)}`}
            icon={earningsIcon}
          />
          <InfoCardBox
            title="Products"
            to="/admin/products"
            count={products.length}
            icon={productsIcon}
          />
          <InfoCardBox
            title="Orders"
            to="/admin/orders"
            count={orders.length}
            icon={ordersIcon}
          />
        </div>
        <div className="grid place-items-center py-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">
            Order Status Summery
          </h2>
          <ShippingStatusBarChart />
        </div>
      </div>
    </>
  );
};

export default Home;
