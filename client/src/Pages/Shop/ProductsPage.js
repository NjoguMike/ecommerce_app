import ProductsCollection from "../../components/ProductsCollection";
import React from "react";
import SideBar from "../../components/SideBar";
import FeaturedProducts from "../../components/FeaturedProducts";

function ProductsPage({ products, setToFavorite }) {
  return (
    <div className="main-page">
      <SideBar />
      <div className="products">
          <FeaturedProducts products={products} />
          <ProductsCollection products={products} setFavorite={setToFavorite} />
      </div>
    </div>
  );
}
export default ProductsPage;
