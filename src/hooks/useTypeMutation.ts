import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
// import { IProduct } from "../interface/product";
import { useNavigate } from "react-router-dom";
import { IType } from "../interface/type";
import { addType, deleteType, updateType } from "../service/type";

type useTypeMutationProps = {
  action: "CREATE" | "UPDATE" | "DELETE";
};

export const useTypeMutation = ({ action }: useTypeMutationProps) => {
  const queryClient = useQueryClient();
  const form = useForm<IType>();
  const navigate = useNavigate();

  const { mutate, ...rest } = useMutation({
    mutationFn: async (type: IType) => {
      switch (action) {
        case "CREATE":
          return await addType(type);
        case "DELETE":
          return (
            window.confirm("Are you sure you want to delete this product?") &&
            (await deleteType(type))
          );
        case "UPDATE":
          return await updateType(type);
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
  const onSubmit: SubmitHandler<IType> = async (type) => {
    mutate(type);
  };
  return { mutate, form, onSubmit, ...rest };
};
