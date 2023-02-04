import React from "react";
import { Bar } from "react-chartjs-2";
import { useSelector } from "react-redux";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJs,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: false,
      text: "Order Status Summery",
    },
  },
};

const ShippingStatusBarChart = () => {
  const orders = useSelector((state) => state.order.orderHistory);

  const arr = [];

  orders.map((item) => {
    return arr.push(item.orderStatus.status);
  });

  const getOrderCount = (arr, value) => {
    return arr.filter((n) => n === value).length;
  };

  const placed = getOrderCount(arr, "Placed");
  const processing = getOrderCount(arr, "Processing");
  const shipped = getOrderCount(arr, "Shipped");
  const delivered = getOrderCount(arr, "Delivered");

  const data = {
    labels: ["Placed", "Processing", "Shipped", "Delivered"],
    datasets: [
      {
        label: "Count",
        data: [placed, processing, shipped, delivered],
        backgroundColor: "#f3e8ff",
      },
    ],
  };

  return (
    <Bar options={options} data={data} />
  );
};

export default ShippingStatusBarChart;
