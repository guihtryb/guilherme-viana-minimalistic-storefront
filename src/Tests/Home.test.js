import React from "react";
import Header from '../Components/Header';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'
import { screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event'

describe("Header component works correctly", () => {
  test('Header component render elements correctly', async () => {
    renderWithRouterAndRedux(
      <Header />,
    );

    const clothesNavLink = await screen.findByRole("link", { name: /clothes/i });
    const techNavLink = await screen.findByRole("link", { name: /tech/i });

    const headerNavLinks = [clothesNavLink, techNavLink];

    for (let navLink of headerNavLinks) {
      expect(navLink).toBeInTheDocument();
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

  test('Header actions works correctly', () => {
    renderWithRouterAndRedux(
      <Header />,
    );
    const currencySwitcher = screen.getByTestId("currency-switcher");
    const cartOverlay = screen.getByTestId("cart-overlay");

    userEvent.click(currencySwitcher);
    const currencyOptions = screen.getAllByTestId("currency-option");

    expect(currencyOptions.length).toBe(5);
  
    userEvent.click(cartOverlay);

    const userBag = screen.getByText("My Bag,");
    expect(userBag).toBeInTheDocument();
  });
});