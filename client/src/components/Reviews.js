import React from "react";
import ProductDetailsCard from "./ProductDetailsCard";

function Reviews({
  products,
  reviews,
  productsDictionary,
  commentsDictionary,
  setCommentsDictionary,
}) {

  console.log(commentsDictionary,
    setCommentsDictionary)
  return (
    <div className="reviews-component">
      <h2>Reviews</h2>
      {/* Check Mucic collection main div styling*/}
      <div className="list-of-reviews">
        {reviews.map((review) => (
          <ProductDetailsCard
            key={review.id}
            review={review}
            products={products}
            product={productsDictionary[review.product_id]}
            usercomment={commentsDictionary[review.user_id]}
            commentsDictionary={commentsDictionary}
            setCommentsDictionary={setCommentsDictionary}
          />
        ))}
      </div>
    </div>
  );
}

export default Reviews;
