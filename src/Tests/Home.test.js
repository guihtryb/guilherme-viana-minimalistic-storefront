import React from "react";
import Home from '../Pages/Home';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe("Home page works correctly", () => {
  test('Home page render elements correctly', async () => {
    renderWithRouterAndRedux(
      <Home />,
    );
      const categoryName = await screen.findByTestId("category-name");
      expect(categoryName).toHaveTextContent("Tech");

      const products = await screen.findAllByRole("img");
      expect(products).toHaveLength(6);
  });

  test('Home actions works correctly', () => {
    renderWithRouterAndRedux(
      <Home />,
    );
  });
});