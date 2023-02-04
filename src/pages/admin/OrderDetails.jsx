import { Loading } from "notiflix";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OrderStatusForm from "../../components/admin/OrderStatusForm";
import useFetchDocument from "../../hooks/useFetchDocument";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const OrderDetails = () => {
  const [order, setOrder] = useState(null);

  const { id } = useParams();
  const { document } = useFetchDocument("orders", id);

  useEffect(() => {
    setOrder(document);
  }, [document]);

  const changeWidth = (status) => {
    let width = "0";
    switch (status) {
      case "Placed":
        width = "5%";
        break;

      case "Processing":
        width = "38%";
        break;

      case "Shipped":
        width = "63%";
        break;

      case "Delivered":
        width = "100%";
        break;

      default:
        break;
    }
    return width;
  };

  return (
    <>
      {order === null ? (
        Loading.standard()
      ) : (
        <>
          {Loading.remove()}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
              Order Details
            </h1>

            <div className="text-sm border-b border-gray-200 mt-2 pb-5 sm:flex sm:justify-between">
              <dl className="flex">
                <dt className="text-gray-500">Order number&nbsp;</dt>
                <dd className="font-medium text-gray-900">FAO{order.id}</dd>
                <dt>
                  <span className="sr-only">Date</span>
                  <span className="text-gray-400 mx-2" aria-hidden="true">
                    &middot;
                  </span>
                </dt>
                <dd className="font-medium text-gray-900">
                  <time dateTime="2021-03-22">{order.orderDate}</time>
                </dd>
              </dl>
              <div className="mt-4 sm:mt-0">
                <OrderStatusForm order={order} />
              </div>
            </div>

            <section aria-labelledby="products-heading" className="mt-8">
              <h2 id="products-heading" className="sr-only">
                Products purchased
              </h2>

              <div className="space-y-24">
                {order.cartItems.map((product) => (
                  <div
                    key={product.id}
                    className="grid grid-cols-1 text-sm sm:grid-rows-1 sm:grid-cols-12 sm:gap-x-6 md:gap-x-8 lg:gap-x-8"
                  >
                    <div className="sm:col-span-4 md:col-span-5 md:row-end-2 md:row-span-2">
                      <div className="aspect-w-1 aspect-h-1 bg-gray-50 rounded-lg overflow-hidden">
                        <img
                          src={product.imageURL}
                          alt={product.name}
                          className="object-center object-cover"
                        />
                      </div>
                    </div>
                    <div className="mt-6 sm:col-span-7 sm:mt-0 md:row-end-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        <p>
                          {product.name} ({product.cartQuantity})
                        </p>
                      </h3>
                      <p className="font-medium text-gray-900 mt-1">
                        ${product.price.toFixed(2)}
                      </p>
                      <p className="text-gray-500 mt-3">
                        {product.description}
                      </p>
                    </div>
                    <div className="sm:col-span-12 md:col-span-7">
                      <dl className="grid grid-cols-1 gap-y-8 py-8 sm:grid-cols-2 sm:gap-x-6 sm:py-6 md:py-10">
                        <div>
                          <dt className="font-medium text-gray-900">
                            Shipping address
                          </dt>
                          <dd className="mt-3 text-gray-500">
                            <span className="block">
                              {order.shippingAddress.address}
                            </span>
                            <span className="block">
                              {order.shippingAddress.apartment}
                            </span>
                            <span className="block">
                              {order.shippingAddress.city}
                            </span>
                            <span className="block">
                              {order.shippingAddress.state}
                            </span>
                            <span className="block">
                              {order.shippingAddress.postal_code}
                            </span>
                            <span className="block">
                              {order.shippingAddress.phone}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <p className="font-medium text-gray-900 mt-6 md:mt-10">
              {order.orderStatus.status} on{" "}
              <time>
                {order.orderStatus.date} at {order.orderStatus.time}
              </time>
            </p>
            <div className="mt-6">
              <div className="bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-2 bg-purple-600 rounded-full"
                  style={{ width: changeWidth(order.orderStatus.status) }}
                />
              </div>
              <div className="hidden sm:grid grid-cols-4 font-medium text-gray-600 mt-6">
                <div
                  className={
                    order.orderStatus.status === "Placed"
                      ? "text-purple-600"
                      : ""
                  }
                >
                  Order placed
                </div>
                <div
                  className={classNames(
                    order.orderStatus.status === "Processing"
                      ? "text-purple-600"
                      : "",
                    "text-center"
                  )}
                >
                  Processing
                </div>
                <div
                  className={classNames(
                    order.orderStatus.status === "Shipped"
                      ? "text-purple-600"
                      : "",
                    "text-center"
                  )}
                >
                  Shipped
                </div>
                <div
                  className={classNames(
                    order.orderStatus.status === "Delivered"
                      ? "text-purple-600"
                      : "",
                    "text-right"
                  )}
                >
                  Delivered
                </div>
              </div>
            </div>

            {/* Billing */}
            <section aria-labelledby="summary-heading" className="mt-24">
              <h2 id="summary-heading" className="sr-only">
                Billing Summary
              </h2>

              <div className="bg-gray-50 rounded-lg py-6 px-6 lg:px-0 lg:py-8 lg:grid lg:grid-cols-12 lg:gap-x-8">
                <dl className="grid grid-cols-1 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:pl-8 lg:col-span-5">
                  <div>
                    <dt className="font-medium text-gray-900">
                      Billing address
                    </dt>
                    <dd className="mt-3 text-gray-500">
                      <span className="block">
                        {order.billingAddress.address}
                      </span>
                      <span className="block">
                        {order.billingAddress.apartment}
                      </span>
                      <span className="block">{order.billingAddress.city}</span>
                      <span className="block">
                        {order.billingAddress.state}
                      </span>
                      <span className="block">
                        {order.billingAddress.postal_code}
                      </span>
                      <span className="block">
                        {order.billingAddress.phone}
                      </span>
                    </dd>
                  </div>
                </dl>

                <dl className="mt-8 divide-y divide-gray-200 text-sm lg:mt-0 lg:pr-8 lg:col-span-7">
                  <div className="pb-4 flex items-center justify-between">
                    <dt className="text-gray-600">Subtotal</dt>
                    <dd className="font-medium text-gray-900">
                      ${(order.orderAmount - 13.32).toFixed(2)}
                    </dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Shipping</dt>
                    <dd className="font-medium text-gray-900">$5</dd>
                  </div>
                  <div className="py-4 flex items-center justify-between">
                    <dt className="text-gray-600">Tax</dt>
                    <dd className="font-medium text-gray-900">$8.32</dd>
                  </div>
                  <div className="pt-4 flex items-center justify-between">
                    <dt className="font-medium text-gray-900">Order total</dt>
                    <dd className="font-medium text-purple-600">
                      ${order.orderAmount.toFixed(2)}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
};

export default OrderDetails;
