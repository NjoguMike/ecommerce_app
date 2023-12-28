import React from "react";
import { Link } from "react-router-dom";
import { strToPrice } from "../utils/helpers";
import {ReactComponent as AddCart} from "../assets/AddToCart.svg"
import { ReactComponent as Like} from "../assets/Not_Liked.svg"

function ProductCard({ product, addToFavorite }) {
  return (
    <div className="product-card">
      <div className="product-box">
        <img
          className="product-img"
          src={product.imageUrl}
          alt="product-cover"
        />
        <h3>{product.name}</h3>
        <h4>{strToPrice(product.price)}</h4>
        <p>{product.category}</p>
      </div>
      <div className="product-components">
        <button className="product-button">
          <Link to={`/products/${product.id}`}>View</Link>
        </button>
        <span>
          <Like onClick={addToFavorite} className="icon-button like"/>
          <AddCart onClick={addToFavorite} className="icon-button cart"/>
        </span>

      </div>
    </div>
  );
}

export default ProductCard;
