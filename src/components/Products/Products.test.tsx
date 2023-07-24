import { render, screen, waitFor } from "@testing-library/react";

import Products from "./Products";

describe("<Products/>", () => {
  it("Api called properly", async () => {
    render(<Products />);
    await waitFor(() => {
      expect(screen.getByTestId("product-id")).toBeInTheDocument();
    });
    expect(screen.getByTestId("products-page")).toMatchSnapshot()
  });
});
