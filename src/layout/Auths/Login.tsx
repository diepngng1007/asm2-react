import { TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "../../interface/auth";
import { useNavigate } from "react-router-dom";
import { SignIn } from "../../service/auth";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IAuth>();
  // console.log(123)
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IAuth> = async (data: IAuth) => {
    try {
      
      const res = await SignIn({ email: data.email, password: data.password });
      console.log(res);
      if (res.response?.data.status == 1) {
        
        alert(res.response?.data.message);
      } else {
    localStorage.setItem('info', JSON.stringify(res.user));
    localStorage.setItem('token', JSON.stringify(res.accessToken))
        if (res.user.role == "admin") {
          // chuyen huong den admin
          navigate("/dashboard");
          alert("Dang nhap thanh cong")
        } else {
          // chuyen huong ve client
          navigate("/home");
          alert("Dang nhap thanh cong")
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="h-screen p-8 shadow-md bg-gradient-to-r from-orange-400 to-pink-500">
      <h1 className="text-[30px] text-center">Login</h1>
      <div className="flex items-center justify-center">
        <form action="" className="w-[500px]" onSubmit={handleSubmit(onSubmit)}>
          <div className="my-4">
            <TextField
              id="filled-basic"
              label="Email Address"
              variant="filled"
              className="w-full"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <small className="text-red-700">
                Trường này không được để trống
              </small>
            )}
          </div>
          <div className="my-4">
            <TextField
              id="filled-basic"
              label="Password"
              variant="filled"
              className="w-full"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <small className="text-red-700">
                Trường này không được để trống
              </small>
            )}
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
