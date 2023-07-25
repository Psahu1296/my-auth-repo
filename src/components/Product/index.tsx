import { ProductParams } from "./ProductsTypes";
import "../Products/Products.css"

const Product = (params: ProductParams) => {
  return (
    <div data-testid="product-id" className="wrapper">
      <span data-testid="product-title" className="title">
        Title: {params.title}
      </span>
      <span data-testid="product-price" >RS :{params.price}</span>
      <span data-testid="product-category">Category: {params.category}</span>
      {/* <span >Description: {params.description}</span> */}
      <img className="product-image" src={params.image} alt="product" />
    </div>
  );
};

export default Product;
