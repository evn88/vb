import { render, screen } from "@testing-library/react";
import App from "./App";

describe("Core test", () => {
  test("renders learn react link", () => {
    render(<App />);
    const linkElement = screen.getByText(/Todo App/i);
    expect(linkElement).toBeInTheDocument();
  });
});
