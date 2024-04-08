import React, { useState } from "react";
import { useGlobalState } from "../contexts/CartContextProvider";
import { IProduct } from "../interface/product";

function CartPage() {
  const { state, dispatch } = useGlobalState();
  // const totalCart = state.currentCart && state.currentCart.length;
  const handleRemoveOneCart = (id: string | undefined) => {
    const isConfirmed = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này khỏi giỏ hàng không?");
    if (isConfirmed) {
      dispatch({ type: 'DELETE_CART', payload: { _id: id } });
    }
  }
  
  const handleQuantityChange = (id: string | undefined, quantityChange: number) => {
   if(quantityChange <=0){
    handleRemoveOneCart(id)
   }else {
    dispatch({ type: 'UPDATE_CART', payload: { _id: id, quantity: quantityChange } });
   }
    
  }
  
  return (
    <div className="mx-auto container shadow-md rounded-lg w-[1000px] mt-28">
      <div className="px-5 py-3">
        <span className="font-bold text-center text-purple-600 text-[30px] drop-shadow-lg shadow-purple-500">
          Shopping Cart
        </span>
      </div>
      <table className="text-sm text-left text-gray-500 w-[1000px] rtl:text-right dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-16 py-3 text-center">
              Images
            </th>
            <th scope="col" className="px-6 py-3">
              Product Name
            </th>
            <th scope="col" className="px-6 py-3">
              Qty
            </th>
            <th scope="col" className="px-6 py-3">
              Price
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {state.currentCart.map((item: IProduct, index: number) => (
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600" key={index}>
                <td className="flex justify-center p-4">
                  <img
                    src={`${item.thumbnail}`}
                    className="w-16 max-w-full max-h-full md:w-16"
                    alt={`${item.name}`}
                  />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  {item.name}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button
                      className="inline-flex items-center justify-center w-6 h-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full me-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                      onClick={() => handleQuantityChange(item._id, item.quantity - 1)} // Giảm số lượng
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 2"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M1 1h16"
                        />
                      </svg>
                    </button>
                    <div>
                      <input
                        type="number"
                        id="first_product"
                        className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={item.quantity} 
                        />
                    </div>
                    <button
                      className="inline-flex items-center justify-center w-6 h-6 p-1 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full ms-3 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                      type="button"
                      onClick={() => handleQuantityChange(item._id, item.quantity + 1)} // Tăng số lượng
                    >
                      <span className="sr-only">Quantity button</span>
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 1v16M1 9h16"
                        />
                      </svg>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                  ${item.price}
                </td>
                <td className="px-6 py-4">
                  <a
                    href="#"
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => handleRemoveOneCart(item._id)}
                  >
                    Remove
                  </a>
                </td>
              </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CartPage;
