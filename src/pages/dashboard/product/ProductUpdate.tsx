import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import useProductQuery from '../../../hooks/useProductQuery'
import { useProductMutation } from '../../../hooks/useProductMutation'

function ProductUpdate() {
  const [image, setImage] = useState<any>(null)
  const [currentImage, setCurrentImage] = useState<any>(null);
  const { id } = useParams()
  // console.log(id)
  // lấy thông tin để fill vào form
  const { data } = useProductQuery({id})
  
  const { form, onSubmit, isPending } = useProductMutation({
    action: "UPDATE",
    image
  })
  const handleImageChange = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      setImage(file);
    }
   
  }
  useEffect(() => {
    // Lưu trữ ảnh hiện tại vào biến trung gian khi có dữ liệu
    if (data?.data.length > 0 && data?.data[0].thumbnail) {
      setCurrentImage(data.data[0].thumbnail);
    }
    // Nếu không có ảnh mới được tải lên, giữ nguyên ảnh hiện tại
    if (!image && currentImage) {
      setImage(currentImage);
    }
    form.reset(data?.data[0])
    console.log(data?.data[0])
    // alert('success')
  }, [id, form.reset, form, data?.data])
  return (  
    <div>
      <h1 className="text-center text-[30px]">Product Form</h1>
      <form  className="flex flex-col items-center w-full" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="mb-5">
          <label
            htmlFor="base-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product Name
          </label>
          <input
            type="text"
            id="base-input"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[600px] h-[50px] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...form.register("name", {required: true})}
          />
          {form.formState.errors.name && (
            <small className="text-red-700">
              Trường này không được để trống
            </small>
          )}
        </div>
        <div className="mb-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            htmlFor="user_avatar"
          >
            Product Thumbnail
          </label>
          <img src={currentImage || image} alt="Current Product" className="w-40 h-40 mx-auto mb-5" />
          <input
            className="block text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 w-[600px]"
            aria-describedby="user_avatar_help"
            id="user_avatar"
            type="file"
            {...form.register("thumbnail", {required: true})}
            onChange={handleImageChange}
          />
          {form.formState.errors.thumbnail && (
            <small className="text-red-700">
              Trường này không được để trống
            </small>
          )}
        </div>
        <div className="flex gap-5">
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Price
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[50px] w-[288px]"
              {...form.register("price", {required: true})}
            />
            {form.formState.errors.price && (
            <small className="text-red-700">
              Trường này không được để trống
            </small>
          )}
          </div>
          <div className="mb-5">
            <label
              htmlFor="base-input"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Quantity
            </label>
            <input
              type="text"
              id="base-input"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 h-[50px] w-[288px]"
              {...form.register("quantity", {required: true})}
            />
            {form.formState.errors.quantity && (
            <small className="text-red-700">
              Trường này không được để trống
            </small>
          )}
          </div>
        </div>
          <div className="mb-5">
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Description
            </label>
            <textarea
              id="message"
              rows={4}
              className="block p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[600px]"
              placeholder="Leave a comment..."
              defaultValue={""}
              {...form.register("desc", {required:true})}
            />
            {form.formState.errors.desc && (
            <small className="text-red-700">
              Trường này không được để trống
            </small>
          )}
        </div>
        {/* <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Type-ID
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[600px] h-[50px]"
               {...form.register("id_type", {required: true})}
            >
              <option>Choose Type</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </select>
        </div>  */}
         {/* <div className="mb-5">
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Product Size
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 w-[600px] h-[50px]"
              {...form.register("size", {required: true})}
            >
              <option>Choose Size</option>
              <option>Canada</option>
              <option>France</option>
              <option>Germany</option>
            </select>
        </div> */}
        <button  className="px-10 py-4 mb-2 text-sm font-medium text-white bg-green-400 rounded-lg focus:outline-none hover:bg-green-800 focus:ring-4 focus:ring-green-300 me-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" >{isPending ? "Đang cập nhật" : "Submit Form"}</button>
      </form>
    </div>
  )
}

export default ProductUpdate
