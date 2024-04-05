import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { IProduct } from "../interface/product";
import { useNavigate } from "react-router-dom";
import { addProduct, deleteProduct, updateProduct } from "../service/product";
import { uploadImage } from "../service/upload";

type useProductMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
  image?:any;
};

export const useProductMutation = ({ action,image }: useProductMutationProps) => {
  const queryClient = useQueryClient();
  const form = useForm<IProduct>();
  const navigate = useNavigate();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (product: IProduct) => {
      switch (action) {
        case "CREATE":
          return await addProduct(product);
        case "DELETE":
          return (
            window.confirm("Are you sure you want to delete this product?") &&
            (await deleteProduct(product))
          );
        case "UPDATE":
          console.log(product)
          return await updateProduct(product);
          default:
        return null
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      navigate("/dashboard/products");
    },
  });
  const onSubmit: SubmitHandler<IProduct> = async (product) => {
   console.log(product);
    if (image){
        const formData = new FormData()
        formData.append('file', image)
        formData.append('upload_preset', 'dmwgp0bx')
        try {
              const imageUrl = await uploadImage(formData)
              if(imageUrl){
                mutate({...product,thumbnail:imageUrl})
              }
              
            } catch (error) {
              console.log(error)
            }
      
    }
    
  };
  return { mutate, form, onSubmit, ...rest };
};
