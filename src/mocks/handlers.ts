// src/mocks/handlers.js
import { rest } from "msw";

export const handlers = [
  rest.post("https://fakestoreapi.com/auth/login", (req, res, ctx) => {
    return res(
      // Respond with a 200 status code
      ctx.status(200),
      ctx.json({
        user: "my-name",
      })
    );
  }),

  rest.get("https://fakestoreapi.com/products", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: "12334",
          title: "my product test",
          category: "test",
          price: "free",
          description: "test data",
          image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        },
      ])
    );
  }),
];
