import React from "react";
import FeaturedCards from "./FeaturedCard";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function FeaturedProducts({ products }) {

  const featured = products.filter((product)=> product.rating > 4)
  return (
      <div className="featured-products">
          <h2>Featured Products</h2>
          <div className="featured">
            <ChevronLeftIcon/>
              {featured.map(product => (
                  <FeaturedCards
                      key={product.id}
                      featured={product}
                  />
              ))}
            <ChevronRightIcon/>
          </div>
      </div>
  )
}

export default FeaturedProducts;
