import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { CALCULATE_SUB_TOTAL } from "../../slices/cartSlice";

export const OrderSummery = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const subTotal = useSelector((state) => state.cart.cartTotalAmount);

    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(CALCULATE_SUB_TOTAL());
  }, [dispatch])

  return (
    <section
      aria-labelledby="summary-heading"
      className="bg-gray-50 pt-16 pb-10 px-4 sm:px-6 lg:px-0 lg:pb-16 lg:bg-transparent lg:row-start-1 lg:col-start-2"
    >
      <div className="max-w-lg mx-auto lg:max-w-none">
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          Order summary
        </h2>

        <ul className="text-sm font-medium text-gray-900 divide-y divide-gray-200">
          {cartItems.map((product) => (
            <li key={product.id} className="flex items-start py-6 space-x-4">
              <img
                src={product.imageURL}
                alt={product.name}
                className="flex-none w-20 h-20 rounded-md object-center object-cover"
              />
              <div className="flex-auto space-y-1">
                <h3>{product.name}</h3>
                <p className="text-gray-500">{product.brand}</p>
                <p className="text-gray-500">{product.cartQuantity}</p>
              </div>
              <p className="flex-none text-base font-medium">
                ${product.price.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>

        <dl className="hidden text-sm font-medium text-gray-900 space-y-6 border-t border-gray-200 pt-6 lg:block">
          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Subtotal</dt>
            <dd>${subTotal.toFixed(2)}</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Shipping</dt>
            <dd>$5.00</dd>
          </div>

          <div className="flex items-center justify-between">
            <dt className="text-gray-600">Taxes</dt>
            <dd>$8.32</dd>
          </div>

          <div className="flex items-center justify-between border-t border-gray-200 pt-6">
            <dt className="text-base">Total</dt>
            <dd className="text-base">${(subTotal + 5 + 8.32).toFixed(2)}</dd>
          </div>
        </dl>

        <Popover className="fixed bottom-0 inset-x-0 flex flex-col-reverse text-sm font-medium text-gray-900 lg:hidden">
          <div className="relative z-10 bg-white border-t border-gray-200 px-4 sm:px-6">
            <div className="max-w-lg mx-auto">
              <Popover.Button className="w-full flex items-center py-6 font-medium">
                <span className="text-base mr-auto">Total</span>
                <span className="text-base mr-2">${(subTotal + 5 + 8.32).toFixed(2)}</span>
                <ChevronUpIcon
                  className="w-5 h-5 text-gray-500"
                  aria-hidden="true"
                />
              </Popover.Button>
            </div>
          </div>

          <Transition.Root as={Fragment}>
            <div>
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Popover.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <Popover.Panel className="relative bg-white px-4 py-6 sm:px-6">
                  <dl className="max-w-lg mx-auto space-y-6">
                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Subtotal</dt>
                      <dd>${subTotal.toFixed(2)}</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Shipping</dt>
                      <dd>$5.00</dd>
                    </div>

                    <div className="flex items-center justify-between">
                      <dt className="text-gray-600">Taxes</dt>
                      <dd>$8.32</dd>
                    </div>
                  </dl>
                </Popover.Panel>
              </Transition.Child>
            </div>
          </Transition.Root>
        </Popover>
      </div>
    </section>
  );
};
