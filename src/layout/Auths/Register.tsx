import { Box, TextField } from "@mui/material";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IAuth } from "../../interface/auth";
import { SignUp } from "../../service/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<IAuth>();

  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IAuth> = async (data: IAuth) => {
   
  try {
    const res = await SignUp({ username: data.username, password: data.password, email: data.email });
    // console.log(res.status); 
    if(res?.status === 0){
      navigate("/login"); 
      console.log(res.status)
    }
  } catch (error) {
    console.error(error); 
    alert("Đăng ký thất bại. Vui lòng thử lại!"); 
    // navigate('/register')
  }

  };
  return (
    <div className="h-screen p-8 shadow-md bg-gradient-to-r from-pink-500 via-blue-500 to-indigo-500" style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
      <div style={{width:"max-content",padding:"20px",border:"1px solid white"}} className="bg-indigo-500 rounded-lg shadow-2xl">
        <h1 className="text-[30px] text-white text-center">Register Account</h1>
      <div className="flex items-center justify-center">
        <form action="" className="w-[500px]" onSubmit={handleSubmit(onSubmit)}>
          <Box 
          component="form"
          noValidate
          autoComplete="off"
          >
            <div className="my-4">
              <TextField
                sx={{color:"white"}}
                id="standard-basic"
                label="Username"
                className="w-full"
                variant="standard"
                {...register("username", { required: true })}
              />
              {errors.username && <small className="text-red-700">Trường này không được để trống</small>}
            </div>
            <div className="my-4">
              
              <TextField
                id="standard-basic"
                label="Email Address"
                className="w-full"
                variant="standard"
                {...register("email", { required: true })}
                sx={{
                  '& input:focus': {
                    borderColor: 'white  !important', // Màu viền khi focus
                    color: 'white ', // Màu của text khi focus
                  },
                  '& label.Mui-focused': {
                    color: 'white ', // Màu của label khi focus
                  },
                }}
              />
              {errors.email && <small className="text-red-700">Trường này không được để trống</small>}
            </div>
            <div className="my-4">
              <TextField
                id="standard-basic"
                label="Password"
                className="w-full"
                variant="standard"
                {...register("password", { required: true })}
              />
              {errors.password && <small className="text-red-700">Trường này không được để trống</small>}
            </div>
          </Box>
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-gray-900 bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      </div>
    </div>
  );
}

export default Register;
