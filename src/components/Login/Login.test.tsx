import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { Login } from "@/components";

const loginFlagHandler = jest.fn();

describe("<Login/>", () => {
  it("Component should render properly", () => {
    render(<Login loginFlagHandler={loginFlagHandler} />);
    expect(screen.getByTestId("login-page")).toMatchSnapshot();
    expect(screen.getByTestId("title")).toHaveTextContent(/Sign In/);
    expect(screen.getByTestId("user-label")).toHaveTextContent(/Username/);
    expect(screen.getByTestId("text-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-label")).toHaveTextContent(/Password/);
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-btn")).toHaveTextContent(/sign in/i);
    expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
  });

  it("Login successfully", async () => {
    render(<Login loginFlagHandler={loginFlagHandler} />);
    const loginForm = screen.getByTestId("login-form");
    fireEvent.change(screen.getByTestId("text-input"), {
      target: { value: "name" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "abcde" },
    });
    fireEvent.submit(loginForm);
    await waitFor(() => {
      expect(loginFlagHandler).toHaveBeenCalled();
      expect(screen.queryByTestId("error-msg")).not.toBeInTheDocument();
    });
  });

  it("Login failed", async () => {
    render(<Login loginFlagHandler={loginFlagHandler} />);
    const loginForm = screen.getByTestId("login-form");
    fireEvent.submit(loginForm);
    await waitFor(() => {
      expect(screen.getByTestId("error-msg")).toBeInTheDocument();
    });
  });
});
