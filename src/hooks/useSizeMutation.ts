import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
// import { IProduct } from "../interface/product";
import { useNavigate } from "react-router-dom";
import { IType } from "../interface/type";
// import { addType, deleteType, updateType } from "../service/type";
import { ISize } from "../interface/size";
import { addSize, deleteSize, updateSize } from "../service/size";

type useSizeMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
};

export const useTypeMutation = ({ action }: useSizeMutationProps) => {
  const queryClient = useQueryClient();
  const form = useForm<IType>();
  const navigate = useNavigate();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (size: ISize) => {
      switch (action) {
        case "CREATE":
          return await addSize(size);
        case "DELETE":
          return (
            window.confirm("Are you sure you want to delete this product?") &&
            (await deleteSize(size))
          );
        case "UPDATE":
          return await updateSize(size);
          default:
        return null
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["types"],
      });
      navigate("/dashboard");
    },
  });
  const onSubmit: SubmitHandler<ISize> = async (size) => {
    mutate(size);
  };
  return { mutate, form, onSubmit, ...rest };
};
