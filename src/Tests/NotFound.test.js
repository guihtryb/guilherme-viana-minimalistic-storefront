import { screen } from "@testing-library/react";
import React from "react";
import NotFound from '../Pages/NotFound';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe("NotFound page works correctly", () => {
  test('NotFound page render items correctly', () => {
    renderWithRouterAndRedux(<NotFound />);

    const pageTitle = screen.getByRole("heading", { level: 1, name: "NotFound" });
    const pageMessage = screen.getByText(/This is not the web page you are looking for./);

    const notFoundElements = [pageTitle, pageMessage];

    for (let element of notFoundElements) {
      expect(element).toBeInTheDocument();
    }
  });
});