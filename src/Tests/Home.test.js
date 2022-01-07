import React from "react";
import Header from '../Components/Header';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen } from "@testing-library/react";

describe("Header component works correctly", () => {
  test('Header render component elements correctly', async () => {
    renderWithRouterAndRedux(
      <Header />,
    );
    const headerTexts = [/Clothes/i, /Tech/i];

    for (let text of headerTexts) {
      await screen.findByText(text);
    }

    const headerLogo = screen.getByTestId("header-logo");
    expect(headerLogo).toBeInTheDocument();

    const currencySwitcher = screen.getByTestId("currency-switcher");
    const cartIcon = screen.getByTestId("cart-icon");
    const headerActions = [currencySwitcher, cartIcon];

    for (let element of headerActions) {
      expect(element).toBeInTheDocument();
    }
  });
});