import React from "react";
import FavoriteCard from "./FavoriteCard";

function FavoriteProducts({ favoriteProducts, removeFromFavorites }) {
  return (
    <div>
      <h2>Favorite Products</h2>
      <div className="favorite-collection">
        {favoriteProducts.map((product) => (
          <FavoriteCard
            key={product.id}
            product={product}
            remove={() => removeFromFavorites(product)}
          />
        ))}
      </div>
    </div>
  );
}
export default FavoriteProducts;
