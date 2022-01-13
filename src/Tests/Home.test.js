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

  test('Home page actions works correctly', async () => {
    const { store } = renderWithRouterAndRedux(
      <Home />,
    );

    const addToCartButton = await screen.findAllByTestId("add-to-cart-btn");
    const cartOverlay = screen.getByTestId("cart-overlay");
    
    userEvent.click(cartOverlay);

    const userBagItemsQuantity = screen.getByTestId("bag-items-quantity");

    userEvent.click(addToCartButton[0]);

    expect(userBagItemsQuantity).toBeInTheDocument();
    expect(userBagItemsQuantity).toHaveTextContent("0");

    userEvent.click(addToCartButton[2]);
    expect(userBagItemsQuantity).toHaveTextContent("1");

    userEvent.click(addToCartButton[3]);
    expect(userBagItemsQuantity).toHaveTextContent("2 items");

    const increaseQuantityBtn = screen.getAllByTestId("increase-quantity-btn");

    const itemQuantity = screen.getAllByTestId("item-quantity");
    expect(itemQuantity[0]).toHaveTextContent("1");

    userEvent.click(increaseQuantityBtn[0]);
    expect(itemQuantity[0]).toHaveTextContent("2");

    expect(store.getState().cartItemsReducer.items).toHaveLength(2);

  });
});