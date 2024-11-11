/* eslint-disable react/prop-types */
// Create the context
// Provide the state to context
// Wrap the context in the main root component
// Consume the context using useContext

import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const ShoppingCartContext = createContext(null);

function ShoppingCartProvider({ children }) { // Updated the name here
  const [loading, SetLoading] = useState(true);
  const [listProducts, SetListOfProducts] = useState([]);
  const [productDetails, SetProductDetails] = useState("");
  const [cartItems, SetCartItems] = useState([]);
  const navigate = useNavigate();

  async function fetchListOfProducts() {
    const apiResponse = await fetch("https://dummyjson.com/products");
    const result = await apiResponse.json();

    if (result && result?.products) {
      SetListOfProducts(result?.products);
      SetLoading(false);
    }
  }

  function handletoGoCart(getProduct) {
    console.log(getProduct);

    const exstingCpyofItem = [...cartItems];
    const findIndexOfExistingCartItem = exstingCpyofItem.findIndex(
      (cartItem) => cartItem.id === getProduct.id
    );
    console.log(findIndexOfExistingCartItem);

    if (findIndexOfExistingCartItem === -1) {
      exstingCpyofItem.push({
        ...getProduct,
        Quantity: 1,
        totalprice: getProduct?.price,
      });
    } else {
      exstingCpyofItem[findIndexOfExistingCartItem] = {
        ...exstingCpyofItem[findIndexOfExistingCartItem], 
        Quantity: exstingCpyofItem[findIndexOfExistingCartItem].Quantity + 1,
        totalprice: (exstingCpyofItem[findIndexOfExistingCartItem].Quantity + 1) * exstingCpyofItem[findIndexOfExistingCartItem].price
      }
    }

    SetCartItems(exstingCpyofItem);
    localStorage.setItem("cartItems", JSON.stringify(exstingCpyofItem));
    navigate("/cartlist");
  }
  function handleRemoveCartItem(singleCartItem, isFullyRemoved) {
    let cpyExistingItem = [...cartItems];
    const findIndexOfExistingCartItem = cpyExistingItem.findIndex((cartItem) => cartItem.id === singleCartItem.id);
    if(isFullyRemoved) {
      cpyExistingItem.splice(findIndexOfExistingCartItem, 1);
    }
    else {
      cpyExistingItem[findIndexOfExistingCartItem] = {
        ...cpyExistingItem[findIndexOfExistingCartItem],
        Quantity: cpyExistingItem[findIndexOfExistingCartItem].Quantity - 1,
        totalprice: cpyExistingItem[findIndexOfExistingCartItem].price * (cpyExistingItem[findIndexOfExistingCartItem].Quantity - 1)
      }
    }

    SetCartItems(cpyExistingItem);
    localStorage.setItem("cartItems", JSON.stringify(cpyExistingItem));
    
  }

  useEffect(() => {
    fetchListOfProducts();
    SetCartItems(JSON.parse(localStorage.getItem("cartItems") || "[]"));
  }, []);

  console.log(cartItems);

  return (
    <ShoppingCartContext.Provider
      value={{
        listProducts,
        loading,
        productDetails,
        SetProductDetails,
        SetLoading,
        handletoGoCart,
        cartItems,
        handleRemoveCartItem
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export default ShoppingCartProvider; // Updated the export here
