import React from "react";

import ProductCard from "./ProductCard";

function ProductsCollection({ products, setFavorite }) {
  return (
      <div className="product-collection">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            addToFavorite={() => setFavorite(product)}
          />
        ))}
      </div>
  );
}
export default ProductsCollection;
