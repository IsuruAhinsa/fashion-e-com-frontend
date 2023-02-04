import React from "react";
import StarsRating from "react-star-rate";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const ReviewItem = ({ review, reviewIdx }) => {
  return (
    <div className="flex text-sm text-gray-500 space-x-4">
      <div className="flex-none py-10">
        <img
          src={review.avatarSrc}
          alt=""
          className="w-10 h-10 bg-gray-100 rounded-full"
        />
      </div>
      <div
        className={classNames(
          reviewIdx === 0 ? "" : "border-t border-gray-200",
          "flex-1 py-10"
        )}
      >
        <h3 className="font-medium text-gray-900">{review.username}</h3>
        <p>
          <time dateTime={review.reviewDate}>{review.reviewDate}</time>
        </p>

        <div className="flex items-center mt-4">
          <StarsRating allowClear={false} value={review.rate} disabled />
        </div>
        <p className="sr-only">{review.rating} out of 5 stars</p>

        <div
          className="mt-4 prose prose-sm max-w-none text-gray-500"
          dangerouslySetInnerHTML={{ __html: review.review }}
        />
      </div>
    </div>
  );
};

export default ReviewItem;
