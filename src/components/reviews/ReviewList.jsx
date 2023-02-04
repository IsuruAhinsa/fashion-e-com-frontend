import ReviewItem from "./ReviewItem";

const ReviewList = ({ product }) => {
  return (
    <div>
      <h2 className="sr-only">Customer Reviews</h2>

      <div>
        {product.reviews === undefined ? (
          <div className="py-10">
            <p className="text-xl text-gray-500">Be a first review creator for this product.</p>
          </div>
        ) : (
          product.reviews.map((review, index) => (
            <ReviewItem review={review} key={index} reviewIdx={index} />
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewList;
