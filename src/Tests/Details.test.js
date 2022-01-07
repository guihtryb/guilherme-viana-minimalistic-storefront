import { screen } from "@testing-library/react";
import React from "react";
import { scryRenderedDOMComponentsWithClass } from "react-dom/test-utils";
import Details from '../Pages/Details';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux'

describe("Details page works correctly", () => {
  const product =   {
    category: 'clothes',
    attributes: { 
      name: 'Size',
      items: [
        { value: '40'},
        { value: '41'},
        { value: '42'},
        { value: '43'},
      ]
    },
      description: "<p>Great sneakers for everyday use!</p>",
      id: "huarache-x-stussy-le",
      inStock: true,
      name: "Nike Air Huarache Le",
      prices: [
      {currency: 'USD', amount: 144.69 },
    ]
  }
  const paramsForTest = {
    params: {
      id: product.id,
      category: product.category,
    },
  };
  
  test('Details page render elements correctly', async () => {
    renderWithRouterAndRedux(<Details product={ product }  match={paramsForTest}/>, {
    });
      const productName = await screen.findByRole('heading', {
        name: product.name,
      });

      const attributeTitle = await screen.findByRole("heading", { name: `${product.attributes.name}:` });
      const attributeOptions = await screen.findAllByTestId("attribute-option");
      const priceTitle = await screen.findByRole("heading", { name: /Price/i });
      const productPrice = await screen.findByTestId("product-price");
      const productDescription = await screen.findByTestId("product-description");

      expect(attributeOptions).toHaveLength(4);

      const ProductInfos = [productName, attributeTitle, priceTitle, productPrice, productDescription];
      
      for (let info of ProductInfos) {
        expect(info).toBeInTheDocument();
      }

      const addToCartBtn = screen.getByTestId("details-add-to-cart-btn");
      const productMinImages = screen.getAllByTestId("details-min-images");
      const productMainImage = screen.getAllByRole("img");

      expect(addToCartBtn).toBeInTheDocument();
      expect(productMinImages).toHaveLength(5)
      expect(productMainImage[0].src).toBe("https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087");
  });
});