import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import { HeartIcon } from "@heroicons/react/24/outline";
import { useParams } from "react-router-dom";
import useFetchDocument from "../hooks/useFetchDocument";
import { useEffect } from "react";
import { Loading } from "notiflix/build/notiflix-loading-aio";
import { useDispatch } from "react-redux";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "../slices/cartSlice";
import ReviewList from "../components/reviews/ReviewList";
import ReviewForm from "../components/reviews/ReviewForm";
import useAuth from "../hooks/useAuth";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const SingleProduct = () => {
  const { id } = useParams();
  const { document } = useFetchDocument("products", id);
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const authenticated = useAuth();

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToCart = (event, product) => {
    event.preventDefault();
    dispatch(ADD_TO_CART(product));
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };

  return (
    <>
      {product === null ? (
        Loading.standard()
      ) : (
        <>
          {Loading.remove()}
          <div className="bg-white">
            <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="lg:grid lg:grid-cols-2 lg:gap-x-8 lg:items-start">
                {/* Image */}
                <div className="flex">
                  <div className="w-full aspect-w-1 aspect-h-1">
                    <img
                      src={product.imageURL}
                      alt={product.name}
                      className="w-full h-full object-center object-cover sm:rounded-lg"
                    />
                  </div>
                </div>

                {/* Product info */}
                <div className="mt-10 px-4 sm:px-0 sm:mt-16 lg:mt-0">
                  <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                    {product.name}
                  </h1>
                  <small className="text-gray-500">{product.brand}</small>

                  <div className="mt-3">
                    <h2 className="sr-only">Product information</h2>
                    <p className="text-3xl text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>
                  </div>

                  {/* Reviews */}
                  <div className="mt-3">
                    <h3 className="sr-only">Reviews</h3>
                    <div className="flex items-center">
                      <div className="flex items-center">
                        {[0, 1, 2, 3, 4].map((rating) => (
                          <StarIcon
                            key={rating}
                            className={classNames(
                              product.rating > rating
                                ? "text-indigo-500"
                                : "text-gray-300",
                              "h-5 w-5 flex-shrink-0"
                            )}
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <p className="sr-only">{product.rating} out of 5 stars</p>
                    </div>
                  </div>

                  <form className="mt-6">
                    <div className="mt-10 flex sm:flex-col1">
                      <button
                        type="submit"
                        className="max-w-xs flex-1 bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 focus:ring-indigo-500 sm:w-full"
                        onClick={(e) => addToCart(e, product)}
                      >
                        Add to cart
                      </button>

                      <button
                        type="button"
                        className="ml-4 py-3 px-3 rounded-md flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                      >
                        <HeartIcon
                          className="h-6 w-6 flex-shrink-0"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Add to favorites</span>
                      </button>
                    </div>
                  </form>

                  <section aria-labelledby="details-heading" className="mt-12">
                    <h2 id="details-heading" className="sr-only">
                      Additional details
                    </h2>

                    <div className="border-t divide-gray-200 space-y-5">
                      <p className="text-gray-900 font-medium text-lg mt-5">
                        Description
                      </p>
                      <p className="text-gray-500 ">{product.description}</p>
                    </div>
                  </section>
                </div>

                {authenticated && <ReviewForm productId={product.id} />}

                <ReviewList product={product} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default SingleProduct;
