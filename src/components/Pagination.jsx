/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ArrowLongLeftIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/24/outline";
import React from "react";
import { useState } from "react";

const Pagination = ({
  totalProducts,
  productsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pageNumbers = [];
  const [pageNumberLimit] = useState(5);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const paginateNext = () => {
    setCurrentPage(currentPage + 1);
    if (currentPage + 1 > maxPageNumberLimit) {
      setMaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
  };

  const paginatePrevious = () => {
    setCurrentPage(currentPage - 1);
    if ((currentPage - 1) % pageNumberLimit === 0) {
      setMaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setMinPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
  };

  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  const currentStyle =
    "border-indigo-500 text-indigo-600 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium hover:cursor-pointer";
  const defaultStyle =
    "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 border-t-2 pt-4 px-4 inline-flex items-center text-sm font-medium hover:cursor-pointer";

  return (
    <nav className="border-t border-gray-200 px-4 my-8 flex items-center justify-between sm:px-0">
      <div className="-mt-px w-0 flex-1 flex">
        {currentPage !== 1 && (
          <div
            onClick={paginatePrevious}
            className="border-t-2 border-transparent pt-4 pr-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:cursor-pointer"
          >
            <ArrowLongLeftIcon
              className="mr-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
            Previous
          </div>
        )}
      </div>

      <div className="hidden md:-mt-px md:flex">
        {pageNumbers.map((number) => {
          if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
            return (
              <div
                key={number}
                onClick={() => paginate(number)}
                className={currentPage === number ? currentStyle : defaultStyle}
                aria-current="page"
              >
                {number}
              </div>
            );
          }
        })}
      </div>

      <div className="-mt-px w-0 flex-1 flex justify-end">
        {currentPage < pageNumbers.length  && (
          <div
            onClick={paginateNext}
            className="border-t-2 border-transparent pt-4 pl-1 inline-flex items-center text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:cursor-pointer"
          >
            Next
            <ArrowLongRightIcon
              className="ml-3 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
    </nav>
  );
};

export default Pagination;
