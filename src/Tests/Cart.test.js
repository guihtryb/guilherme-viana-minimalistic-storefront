import { screen } from "@testing-library/react";
import React from "react";
import CartProduct from "../Components/CartProduct";
import Cart from "../Pages/Cart";
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe("Cart page works correctly", () => {
const simulatedItems = [
  {
  attributesChosen: [{
    Size: '43',
  }],
  name: "Nike Air Huarache Le",
  pic: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
  productAttributes: [{
    name: 'Size',
    items: [
      { value: '40'},
      { value: '41'},
      { value: '42'},
      { value: '43'},
    ],
  }],
  prices: [
    {
      currency: 'USD', amount: 144.69,
    },
    {
      currency: 'GBP', amount: 104,
    },
    {
      currency: 'AUD', amount: 186.65,
    },
    {
      currency: 'JPY', amount: 15625.24,
    },
    {
      currency: 'RUB', amount: 10941.76,
    },
  ],
  quanty: 2,
  },
  {
    attributesChosen: [{
      Size: '42',
    }],
    name: "Nike Air Huarache Le",
    pic: "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
    productAttributes: [{
      name: 'Size',
      items: [
        { value: '40'},
        { value: '41'},
        { value: '42'},
        { value: '43'},
      ]
    }],
    prices: [
      {
        currency: 'USD', amount: 144.69,
      },
      {
        currency: 'GBP', amount: 104,
      },
      {
        currency: 'AUD', amount: 186.65,
      },
      {
        currency: 'JPY', amount: 15625.24,
      },
      {
        currency: 'RUB', amount: 10941.76,
      },
    ],
    quanty: 1,
    },
]; 
  test('Cart page has the correct title', () => {
    renderWithRouterAndRedux(<Cart />);

    expect(screen.getByText("Cart")).toBeInTheDocument();

  });
  test('Cart page items render correctly', async () => {
    renderWithRouterAndRedux(<CartProduct />, {
      initialEntries: ["/cart"],
      initialState: {
        cartItemsReducer: {
          items: simulatedItems,
        },
        categoryReducer: {
          category: "clothes",
        },
        currencyReducer: {
          currency: "JPY"
        }
      }
    });

    const productTitle = await screen.findAllByText(simulatedItems[0].name);
    const attributeOption = await screen.findAllByTestId("attribute-option");
    const actualCurrency = await screen.findAllByText(/¥/i);

    expect(attributeOption).toHaveLength(8);
    expect(productTitle && actualCurrency).toHaveLength(2);
    expect(attributeOption[3]).toHaveClass("cart-chosen");
  });
});