import axiosInstance from "../config/axios";
import { IAuth } from "../interface/auth";

export const SignUp = async (account: IAuth) => {
    try {
        const { data } = await axiosInstance.post('/auth/signup', account)
       
        return data
    } catch (error) {
        console.log(error)

    }
}

export const SignIn = async (account: IAuth) => {
    try {
        const { data } = await axiosInstance.post('auth/signin', account)
        console.log(data)
        return data
    } catch (error) {
        return error
        console.log(error)
    }
}