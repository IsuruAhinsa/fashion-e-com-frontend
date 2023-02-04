import { useState } from "react";
import { useSelector } from "react-redux";
import { arrayUnion, doc, Timestamp, updateDoc } from "firebase/firestore";
import StarsRating from "react-star-rate";
import db from "../../firebase/config";

const ReviewForm = ({ productId }) => {
  const [rate, setRate] = useState(0);
  const [review, setReview] = useState("");

  const userId = useSelector((state) => state.auth.userId);
  const username = useSelector((state) => state.auth.username);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const today = new Date();
    const date = today.toDateString();

    const reviewConfig = {
      userId,
      username,
      rate,
      review,
      reviewDate: date,
      createdAt: Timestamp.now().toDate(),
    };

    try {
      const productRef = doc(db, "products", productId);
      await updateDoc(productRef, { reviews: arrayUnion(reviewConfig) });
      setRate(0);
      setReview("");
    } catch (error) {
      console.log(error.message);
    }
  };
  
  return (
    <div className="flex items-start space-x-4 my-10">
      <div className="flex-shrink-0">
        <img
          className="inline-block h-10 w-10 rounded-full"
          src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
      </div>
      <div className="min-w-0 flex-1">
        <form onSubmit={(e) => handleSubmit(e)} className="relative">
          <div className="border border-gray-300 rounded-lg shadow-sm overflow-hidden focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
            <label htmlFor="comment" className="sr-only">
              Type your review
            </label>
            <textarea
              rows={3}
              className="block w-full py-3 border-0 resize-none focus:ring-0 sm:text-sm"
              placeholder="Type your review..."
              onChange={(e) => setReview(e.target.value)}
              required
              value={review}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute bottom-0 inset-x-0 pl-3 pr-2 py-2 flex justify-between">
            <div className="flex items-center space-x-5">
              <div className="flex items-center">
                <StarsRating
                  allowHalf={false}
                  value={rate}
                  onChange={(rate) => setRate(rate)}
                />
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Submit
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReviewForm;
