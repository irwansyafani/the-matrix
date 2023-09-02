import { render, screen } from "@testing-library/react";
import HomePage from "../src/app/page";
import "@testing-library/jest-dom";

describe("Home", () => {
  it("renders matrix title", async () => {
    render(<HomePage />);

    const textMatrix = (await screen.findByTestId("title-matrix")).textContent;

    expect(textMatrix).toContain("Matrix of")
  });
});
