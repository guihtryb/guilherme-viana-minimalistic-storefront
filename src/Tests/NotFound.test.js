import React from "react";
import { render } from '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../Pages/NotFound';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe("NotFound page works correctly", () => {
  test('', () => {
    renderWithRouterAndRedux(<NotFound />);
  });
});