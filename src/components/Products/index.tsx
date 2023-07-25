import React, { useEffect, useState } from "react";
import "./Products.css";
import { ProductParams } from "@/components/Product/ProductsTypes";
import Product from "@/components/Product";

const Products = () => {
  const [products, setProducts] = useState<ProductParams[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(json => setProducts(json));
  }, []);

  return (
    <div className="main-wrapper" data-testid="products-page">
      {products.length > 0 ?products.map((product: ProductParams) => (
        <Product key={product.id} {...product} />
      )): <div className="" data-testid="no-product">No Products found</div>}
    </div>
  );
};

export default Products;

