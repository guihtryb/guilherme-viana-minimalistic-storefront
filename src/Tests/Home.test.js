import React from "react";
import { render } from '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Home from '../Pages/Home';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe("Home page works correctly", () => {
  test('', () => {
    renderWithRouterAndRedux(<Home />);
  });
});