import axiosInstance from "../config/axios";
import { IType } from "../interface/type";

export const getAllTypes = async () => {
    try {
        const { data } = await axiosInstance.get('/type')
        console.log(data.data)
        return data
    } catch (error) {
        console.log(error)
    }
}
export const getOneType = async (id: string) => {
    try {
        const { data } = await axiosInstance.get(`/type/${id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const addType = async (type: IType) => {
    try {
        const { data } = await axiosInstance.post('/type', type)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteType = async (type: IType) => {
    try {
        const { data } = await axiosInstance.delete(`/type/${type._id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateType = async (type: IType) => {
    try {
        const { data } = await axiosInstance.put(`/type/${type._id}`, type)
        return data
    } catch (error) {
        console.log(error)
    }
}