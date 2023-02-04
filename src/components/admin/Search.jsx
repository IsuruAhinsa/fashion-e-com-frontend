import React, { useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { useDispatch, useSelector } from "react-redux";
import { SEARCH_PRODUCTS } from "../../slices/filterSlice";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const Search = () => {
  const [search, setSearch] = useState("");

  const products = useSelector((state) => state.product.products);
  const filteredProducts = useSelector(
    (state) => state.filter.filteredProducts
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SEARCH_PRODUCTS({ products, search }));
  }, [dispatch, products, search]);

  return (
    <Combobox
      className="w-full flex md:ml-0"
      as="div"
    >
      <div className="relative w-full text-gray-400 focus-within:text-gray-600">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center">
          <Combobox.Button>
            <MagnifyingGlassIcon
              className="flex-shrink-0 h-5 w-5"
              aria-hidden="true"
            />
          </Combobox.Button>
        </div>
        <Combobox.Input
          className="hidden h-full w-full border-transparent py-2 pl-8 pr-3 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-0 focus:border-transparent focus:placeholder-gray-400 sm:block"
          onChange={(event) => setSearch(event.target.value)}
          displayValue={(person) => person.name}
          placeholder="Search products, orders, and more"
        />

        {filteredProducts.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredProducts.map((product) => (
              <Combobox.Option
                key={product.id}
                value={product}
                className={({ active }) =>
                  classNames(
                    "relative cursor-default select-none py-2 pl-3 pr-9",
                    active ? "bg-purple-600 text-white" : "text-gray-900"
                  )
                }
              >
                {product.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        )}
      </div>
    </Combobox>
  );
};

export default Search;
