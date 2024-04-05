import React, { useEffect, useState } from "react";
import useProductQuery from "../hooks/useProductQuery";
import { IProduct } from "../interface/product";
import { Pagination, Stack } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {
  const [currentPages, setCurrentPages] = useState<number>(1);

  const navigate = useNavigate()
  const limit = 15;

  const { data } = useProductQuery({ page: currentPages, limit: limit });
  useEffect(() => {
        if (currentPages) {
          navigate(`/home?page=${currentPages}&limit=${limit}`);
        }
      }, [currentPages]);
  console.log(data);
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap justify-center -m-4">
            {data?.data.map((item: IProduct, index: number) => (
              <div className="p-4 xl:w-1/5" key={index}>
                <div className="flex justify-center border w-[250px] hover:border-blue-200 hover:border-2">
                  <Link to={`detail/${item._id}`}>
                    <img
                      alt="ecommerce"
                      className="block object-center w-[220px] h-[220px]"
                      src={`${item.thumbnail}`}
                    />
                  </Link>
                </div>

                <div className="flex flex-col justify-center mt-4">
                  <h2 className="text-lg font-medium text-gray-900 title-font text-overflow-ellipsis">
                    {item.name}
                  </h2>
                  <p className="mt-1">${item.price}</p>
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
