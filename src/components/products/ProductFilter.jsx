import { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  Menu,
  Transition,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from "react-redux";
import {
  FILTER_BY_BRAND,
  FILTER_BY_CATEGORY,
  FILTER_BY_PRICE,
  SORT_PRODUCTS,
} from "../../slices/filterSlice";

const sortOptions = [
  { name: "Newest", key: "newset", current: true },
  { name: "Lowset Price", key: "lowset-price", current: false },
  { name: "Highest Price", key: "highest-price", current: false },
  { name: "A-Z", key: "a-z", current: false },
  { name: "Z-A", key: "z-a", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductFilter() {
  const [open, setOpen] = useState(false);
  const [sort, setSort] = useState("latest");
  const [category, setCategory] = useState("ALL");
  const [brand, setBrand] = useState("ALL");

  const minPrice = useSelector((state) => state.product.minPrice);
  const maxPrice = useSelector((state) => state.product.maxPrice);

  const [price, setPrice] = useState(maxPrice);

  const dispatch = useDispatch();

  const products = useSelector((state) => state.product.products);

  const allCategories = [
    "ALL",
    ...new Set(products.map((product) => product.category)),
  ];

  const allBrands = [
    "ALL",
    ...new Set(products.map((product) => product.brand)),
  ];

  useEffect(() => {
    dispatch(SORT_PRODUCTS({ sort, products }));
  }, [dispatch, sort, products]);

  const filterByCategory = (category) => {
    setCategory(category);
    dispatch(FILTER_BY_CATEGORY({ category, products }));
  };

  useEffect(() => {
    dispatch(FILTER_BY_BRAND({ brand, products }));
  }, [dispatch, brand, products]);

  useEffect(() => {
    dispatch(FILTER_BY_PRICE({ price, products }));
  }, [dispatch, price, products]);

  return (
    <div className="bg-white pt-8">
      {/* Mobile filter dialog */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 sm:hidden"
          onClose={setOpen}
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
              <div className="px-4 flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                  onClick={() => setOpen(false)}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>

              {/* Filters */}
              <form className="mt-4">
                {/* {filters.map((section) => (
									<Disclosure
										as="div"
										key={section.name}
										className="border-t border-gray-200 px-4 py-6"
									>
										{({ open }) => (
											<>
												<h3 className="-mx-2 -my-3 flow-root">
													<Disclosure.Button className="px-2 py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400">
														<span className="font-medium text-gray-900">
															{section.name}
														</span>
														<span className="ml-6 flex items-center">
															<ChevronDownIcon
																className={classNames(
																	open ? "-rotate-180" : "rotate-0",
																	"h-5 w-5 transform"
																)}
																aria-hidden="true"
															/>
														</span>
													</Disclosure.Button>
												</h3>
												<Disclosure.Panel className="pt-6">
													<div className="space-y-6">
														{section.options.map((option, optionIdx) => (
															<div
																key={option.value}
																className="flex items-center"
															>
																<input
																	id={`filter-mobile-${section.id}-${optionIdx}`}
																	name={`${section.id}[]`}
																	defaultValue={option.value}
																	type="checkbox"
																	defaultChecked={option.checked}
																	className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
																/>
																<label
																	htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
																	className="ml-3 text-sm text-gray-500"
																>
																	{option.label}
																</label>
															</div>
														))}
													</div>
												</Disclosure.Panel>
											</>
										)}
									</Disclosure>
								))} */}
              </form>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>

      {/* Filters */}
      <section aria-labelledby="filter-heading">
        <h2 id="filter-heading" className="sr-only">
          Filters
        </h2>

        <div className="relative z-10 bg-white border-b border-gray-200 pb-4">
          <div className="max-w-7xl mx-auto px-4 flex items-center justify-between sm:px-6 lg:px-8">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                  Sort
                  <ChevronDownIcon
                    className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <Menu.Item key={option.name}>
                        {({ active }) => (
                          <div
                            onClick={() => setSort(option.key)}
                            className={classNames(
                              option.current
                                ? "font-medium text-gray-900"
                                : "text-gray-500",
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm hover:cursor-pointer"
                            )}
                          >
                            {option.name}
                          </div>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>

            <button
              type="button"
              className="inline-block text-sm font-medium text-gray-700 hover:text-gray-900 sm:hidden"
              onClick={() => setOpen(true)}
            >
              Filters
            </button>

            <div className="hidden sm:block">
              <div className="flow-root space-x-6">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Category
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {allCategories.map((category, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <div
                                onClick={() => filterByCategory(category)}
                                className={classNames(
                                  category.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm hover:cursor-pointer"
                                )}
                              >
                                {category}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Brand
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-left absolute left-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-1">
                        {allBrands.map((brand, index) => (
                          <Menu.Item key={index}>
                            {({ active }) => (
                              <div
                                onClick={() => setBrand(brand)}
                                className={classNames(
                                  brand.current
                                    ? "font-medium text-gray-900"
                                    : "text-gray-500",
                                  active ? "bg-gray-100" : "",
                                  "block px-4 py-2 text-sm hover:cursor-pointer"
                                )}
                              >
                                {brand}
                              </div>
                            )}
                          </Menu.Item>
                        ))}
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                      Price
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-left absolute left-0 mt-2 w-auto rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="m-5">
                        <input
                          onChange={(e) => setPrice(e.target.value)}
                          type="range"
                          min={minPrice}
                          max={maxPrice}
                          value={price}
                          step={100}
                        />
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
        </div>

        {/* Active filters */}
        {/* <div className="bg-gray-100">
          <div className="max-w-7xl mx-auto py-3 px-4 sm:flex sm:items-center sm:px-6 lg:px-8">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500">
              Filters
              <span className="sr-only">, active</span>
            </h3>

            <div
              aria-hidden="true"
              className="hidden w-px h-5 bg-gray-300 sm:block sm:ml-4"
            />

            <div className="mt-2 sm:mt-0 sm:ml-4">
              <div className="-m-1 flex flex-wrap items-center">
                {activeFilters.map((activeFilter) => (
                  <span
                    key={activeFilter.value}
                    className="m-1 inline-flex rounded-full border border-gray-200 items-center py-1.5 pl-3 pr-2 text-sm font-medium bg-white text-gray-900"
                  >
                    <span>{activeFilter.label}</span>
                    <button
                      type="button"
                      className="flex-shrink-0 ml-1 h-4 w-4 p-1 rounded-full inline-flex text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                    >
                      <span className="sr-only">
                        Remove filter for {activeFilter.label}
                      </span>
                      <svg
                        className="h-2 w-2"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 8 8"
                      >
                        <path
                          strokeLinecap="round"
                          strokeWidth="1.5"
                          d="M1 1l6 6m0-6L1 7"
                        />
                      </svg>
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
}
