import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductFilter from "./ProductFilter";
import ProductItem from "./ProductItem";
import { ViewColumnsIcon, Squares2X2Icon } from "@heroicons/react/24/solid";
import Search from "../Search";
import { SEARCH_PRODUCTS } from "../../slices/filterSlice";
import { GET_PRICE_RANGE } from "../../pages/admin/productSlice";
import Pagination from "../Pagination";

const gridStyles = `mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8`;
const listStyles = `mt-6 grid grid-col-1 gap-y-6`;

const Products = () => {
  const [grid, setGrid] = useState(true);
  const [search, setSearch] = useState("");

  const products = useSelector((state) => state.product.products);
  const filteredProducts = useSelector(
    (state) => state.filter.filteredProducts
  );
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(8);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  useEffect(() => {
    dispatch(SEARCH_PRODUCTS({ search, products }));
  }, [search, dispatch, products]);

  useEffect(() => {
    dispatch(GET_PRICE_RANGE(products));
  }, [dispatch, products]);

  return (
    <>
      <div className="bg-white">
        <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
          <h2 className="flex justify-between">
            <span className="text-2xl font-bold tracking-tight text-gray-900">
              Customers also purchased
            </span>
            <div className="flex px-4 space-x-4">
              <Squares2X2Icon
                onClick={() => setGrid(true)}
                className={`h-5 w-5 hover:cursor-pointer ${
                  grid
                    ? "text-blue-400 hover:text-blue-700"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              />
              <ViewColumnsIcon
                onClick={() => setGrid(false)}
                className={`h-5 w-5 hover:cursor-pointer ${
                  grid
                    ? "text-gray-400 hover:text-gray-700"
                    : "text-blue-400 hover:text-blue-700"
                }`}
              />
            </div>
          </h2>

          <ProductFilter />

          <div className="mt-4">
            {search && (
              <p className="text-gray-500">
                {filteredProducts.length} products found.
              </p>
            )}
          </div>

          <div className={grid ? gridStyles : listStyles}>
            {products.length === 0 ? (
              <p>No Products Found.</p>
            ) : (
              <>
                <>
                  {currentProducts.map((product) => (
                    <ProductItem
                      product={product}
                      key={product.id}
                      grid={grid}
                    />
                  ))}
                </>
              </>
            )}
          </div>
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            productsPerPage={productsPerPage}
            totalProducts={filteredProducts.length}
          />
        </div>
      </div>
    </>
  );
};

export default Products;
