import React, { ReactNode, createContext, useContext, useReducer } from "react";

export const GlobalStateContext = createContext({} as any);

const initialState = {
  currentCart:
    (localStorage.getItem("cart") &&
      JSON.parse(localStorage.getItem("cart") || "")) ||
    [],
};

const reducer = (state: any, action: any) => {
  console.log(state);
  const check = state.currentCart.find(
    (item: any) => item._id === action.payload._id
  );
  // Loại bỏ sản phẩm khỏi giỏ hàng
  const updatedCart = state.currentCart.filter(
    (item: any) => item._id !== action.payload._id
  );

  switch (action.type) {
    case "ADD_TO_CART":
      if (!check) {
        const newCart = [...state.currentCart, {...action.payload,quantity:1}];
        console.log(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart));
        return { ...state, currentCart: newCart };
      } else {
        alert("Sản phẩm đã có trong giỏ hàng");
        return state;
      }
    case "DELETE_CART":
      // Cập nhật lại Local Storage
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      return { ...state, currentCart: updatedCart };
    case "UPDATE_CART":
    console.log(action)
      if (check) {
       
        const updatedCart = state.currentCart.map((item: any) =>
          item._id === action.payload._id
            ? { ...item, quantity: action.payload.quantity }
            : item
        );
        localStorage.setItem("cart", JSON.stringify(updatedCart));
        return { ...state, currentCart: updatedCart };
      }
      return state;
    default:
      return state;
  }
};

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
