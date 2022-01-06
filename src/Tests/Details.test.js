import React from "react";
import { render } from '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import Details from '../Pages/Details';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe("Details page works correctly", () => {
  test('', () => {
    renderWithRouterAndRedux(<Details />);
  });
});