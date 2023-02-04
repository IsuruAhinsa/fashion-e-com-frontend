import React from "react";
import { Link } from "react-router-dom";

const CheckoutSuccess = () => {
  return (
    <main className="flex-grow mx-auto max-w-7xl w-full flex flex-col px-4 sm:px-6 lg:px-8">
      <div className="flex-shrink-0 my-auto py-16 sm:py-32">
        <p className="text-sm font-semibold text-green-600 uppercase tracking-wide">
          Done
        </p>
        <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
          Payment Successfully!
        </h1>
        <p className="mt-2 text-base text-gray-500">
          Thank you for your purchase.
        </p>
        <div className="mt-6">
          <Link
            to="/order-history"
            className="text-base font-medium text-indigo-600 hover:text-indigo-500"
          >
            Order History<span aria-hidden="true"> &rarr;</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default CheckoutSuccess;