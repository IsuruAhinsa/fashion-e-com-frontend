import React from "react";
import { PageHeader } from "../../components/admin/PageHeader";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProductRow from "../../components/admin/ProductRow";

const Products = () => {
  const products = useSelector((state) => state.product.products);

  return (
    <>
      <PageHeader title="All Products" btnTitle="Add Product" link="add/new" />

      <div className="w-full my-5">
        {products.length === 0 ? (
          <main className="min-h-full py-36 grid place-items-center">
            <div className="sm:ml-6">
              <div className="sm:pl-6">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Products not yet!
                </h1>
                <p className="mt-1 text-base text-gray-500">
                  Please add the products and try again.
                </p>
              </div>
              <div className="mt-10 flex space-x-3 sm:pl-6">
                <Link
                  to="/admin/home"
                  className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-purple-700 bg-purple-100 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                >
                  Home
                </Link>
              </div>
            </div>
          </main>
        ) : (
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Image
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Brand
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product) => (
                    <ProductRow product={product} key={product.id} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Products;
