import React, { useEffect, useState } from "react";
import useProductQuery from "../../../hooks/useProductQuery";
import { useProductMutation } from "../../../hooks/useProductMutation";
import { IProduct } from "../../../interface/product";
import { Link, useNavigate } from "react-router-dom";
import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/16/solid";
import { Stack, Pagination } from "@mui/material";

function ProductList() {
  const [currentPages, setCurrentPages] = useState<number>(1);

  const navigate = useNavigate()
  const limit = 5;

  const { data } = useProductQuery({ page: currentPages, limit: limit });
  useEffect(() => {
        if (currentPages) {
          navigate(`/dashboard/products?page=${currentPages}&limit=${limit}`);
        }
      }, [currentPages]);
  const { mutate } = useProductMutation({ action: "DELETE" });
  console.log(data);
  return (
    <div>
      <div className="w-full overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex items-center justify-around py-3 bg-slate-900">
          <h1 className="text-[30px] text-white">Product List</h1>
          <div className="mt-3">
            <Link
              to="/dashboard/products/add"
              className="flex gap-2 px-5 py-3 mb-2 text-sm font-medium text-white bg-green-600 rounded-md focus:outline-none hover:bg-green-800 focus:ring-4 focus:ring-green-300 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              <PlusIcon className="w-5 text-white" />
              <span>Add New Product</span>
            </Link>
          </div>
        </div>
        <table className="w-full text-sm text-left text-gray-500 rtl:text-right dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-all-search"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Thumbnail
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Quantity
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.data.map((item: IProduct, index: number) => (
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                key={index}
              >
                <td className="w-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  <img
                    src={`${item.thumbnail}`}
                    alt={`${item.name}`}
                    className="w-20"
                  />
                </td>
                <td className="px-6 py-4">{item.price}</td>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4 overflow-y-auto truncate max-h-48 max-w-16">
                  {item.desc}
                </td>
                <td className="flex items-center px-6 py-4 mt-7">
                  <div className="flex gap-1">
                    <PencilIcon className="w-4 text-yellow-400" />
                    <Link
                      to={`/dashboard/products/update/${item._id}`}
                      className="mr-5 font-medium text-yellow-300 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </Link>
                  </div>
                  <div className="flex gap-1">
                    <TrashIcon className="w-4 text-red-600" />
                    <a
                      onClick={() => mutate(item)}
                      className="font-medium text-red-500 dark:text-blue-500 hover:underline"
                    >
                      Delete
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center my-5">
          <Stack spacing={2}>
            <Pagination
              count={data && Math.ceil(data.count / limit)}
              color="primary"
              page={currentPages}
              onChange={(e, page) => setCurrentPages(page)}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
}

export default ProductList;
