import React from "react";

function FeaturedCards({ featured }) {
  return (
    <div className="feature">
        <img src={featured.imageUrl} alt="Product" />
        <h4>{featured.name}</h4>
    </div>
  )
}

export default FeaturedCards;
