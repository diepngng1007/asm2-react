import React, { useEffect, useState } from "react";
import useProductQuery from "../hooks/useProductQuery";
import { IProduct } from "../interface/product";
import { Pagination, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalState } from "../contexts/CartContextProvider";

function HomePage() {
  const [currentPages, setCurrentPages] = useState<number>(1);

  const navigate = useNavigate();
  const limit = 15;

  const { data } = useProductQuery({ page: currentPages, limit: limit });
  useEffect(() => {
    if (currentPages) {
      navigate(`/home?page=${currentPages}&limit=${limit}`);
    }
  }, [currentPages]);
  console.log(data);
  const { state, dispatch} = useGlobalState();
  console.log(state)
  const addToCart = (product : IProduct) => {
    dispatch({ type: 'ADD_TO_CART', payload: product})
    console.log(product)
  }
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="mb-4 border-l-4 border-indigo-500"><span className="pl-3 text-[25px] font-medium">Trending Products</span></div>
          <div className="flex flex-wrap justify-center -m-4">
            {data?.data.map((item: IProduct, index: number) => (
              <div className="p-4 xl:w-1/5" key={index}>
                <div className="flex justify-center border w-[250px] hover:border-pink-300 hover:border-2">
                  <Link to={`detail/${item._id}`}>
                    <img
                      alt="ecommerce"
                      className="block object-center w-[220px] h-[220px]"
                      src={`${item.thumbnail}`}
                    />
                    
                  </Link>
                </div>
                <div className="flex justify-center mt-3">
                      <button className=" inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" onClick={() => addToCart(item)}>
                        <span className=" px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                          Add To Cart
                        </span>
                      </button>
                    </div>
                <div className="flex flex-col justify-center mt-4">
                  <h2 className="text-lg font-medium text-gray-900 title-font text-overflow-ellipsis">
                    {item.name}
                  </h2>
                  <div className="flex">
                    <p className="mt-1">${item.price}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <div className="flex justify-center">
        <Stack spacing={2}>
          <Pagination
            count={data && Math.ceil(data.count / limit)}
            page={currentPages}
            onChange={(e, page) => setCurrentPages(page)}
          />
        </Stack>
      </div>
    </>
  );
}

export default HomePage;
