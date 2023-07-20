import "./Products.css";

import React, { useEffect, useState } from "react";

interface ProductParams {
  id: string;
  title: string;
  category: string;
  price: string;
  description: string;
  image: string;
}

const Products = () => {
  const [products, setProducts] = useState<ProductParams[]>([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then(res => res.json())
      .then(json => setProducts(json));
  });
  return (
    <div className="main-wrapper">
      {products.map((product: ProductParams) => (
        <Product key={product.id} {...product} />
      ))}
    </div>
  );
};

export default Products;

const Product = (params: ProductParams) => {
  return (
    <div data-testid="product-id" className="wrapper">
      <span data-testid="product-title" className="title">
        Title: {params.title}
      </span>
      <span>RS :{params.price}</span>
      <span>Category: {params.category}</span>
      {/* <span >Description: {params.description}</span> */}
      <img className="product-image" src={params.image} alt="product" />
    </div>
  );
};
