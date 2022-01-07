import React from "react";
import Home from '../Pages/Home';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { getByTestId, screen } from "@testing-library/react";
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

  test('Home actions works correctly', async () => {
    renderWithRouterAndRedux(
      <Home />,
    );

    const addToCartButton = await screen.findAllByTestId("add-to-cart-btn");
    const cartOverlay = screen.getByTestId("cart-overlay");
    
    userEvent.click(cartOverlay);

    const userBagItemsQuanty = screen.getByTestId("bag-items-quanty");

    userEvent.click(addToCartButton[0]);

    expect(userBagItemsQuanty).toBeInTheDocument();
    expect(userBagItemsQuanty).toHaveTextContent("0");

    userEvent.click(addToCartButton[2]);
    expect(userBagItemsQuanty).toHaveTextContent("1");

    userEvent.click(addToCartButton[3]);
    expect(userBagItemsQuanty).toHaveTextContent("2 items");

    const increaseQuantyBtn = screen.getAllByTestId("increase-quanty-btn");

    const itemQuanty = screen.getAllByTestId("item-quanty");
    expect(itemQuanty[0]).toHaveTextContent("1");

    userEvent.click(increaseQuantyBtn[0]);
    expect(itemQuanty[0]).toHaveTextContent("2");

  });
});