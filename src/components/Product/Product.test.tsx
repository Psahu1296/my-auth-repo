import { render, screen, waitFor } from "@testing-library/react";

import { Product } from "@/components";
import { ProductParams } from "./ProductsTypes";

describe("<Products/>", () => {
const data: ProductParams = {
    id: "abcsd",
    title: "test title",
    price: "free",
    category: "test category",
    description: "dummy data",
    image: "https://pixibay.com/abcd"
}
  it("Product rendered properly", async () => {
    render(<Product  {...data}/>);
    expect(screen.getByTestId("product-id")).toBeInTheDocument();
    expect(screen.getByTestId("product-title")).toHaveTextContent("test title");
    expect(screen.getByTestId("product-price")).toHaveTextContent("free");
    expect(screen.getByTestId("product-category")).toHaveTextContent("test category");
  });
});
