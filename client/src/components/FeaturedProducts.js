import React from "react";
import FeaturedCards from "./FeaturedCard";

function FeaturedProducts({ products }) {

  const featured = products.filter((product)=> product.rating > 4)
  return (
      <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="featured">
              {featured.map(product => (
                  <FeaturedCards
                      key={product.id}
                      featured={product}
                  />
              ))}
          </div>
      </div>
  )
}

export default FeaturedProducts;
