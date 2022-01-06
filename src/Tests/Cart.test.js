import React from "react";
import { render } from '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Cart from '../Pages/Cart';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe("Cart page works correctly", () => {
  test('', () => {
    renderWithRouterAndRedux(<Cart />);
  });
});