import axiosInstance from "../config/axios";
import { ISize } from "../interface/size";

export const getAllSize = async () => {
    try {
        const { data } = await axiosInstance.get('/size')
        console.log(data.data)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const addSize = async (size: ISize) => {
    try {
        const { data } = await axiosInstance.post('/size', size)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const deleteSize = async (size: ISize) => {
    try {
        const { data } = await axiosInstance.delete(`/size/${size._id}`)
        return data
    } catch (error) {
        console.log(error)
    }
}

export const updateSize = async (size: ISize) => {
    try {
        const { data } = await axiosInstance.put(`/size/${size._id}`, size)
        return data
    } catch (error) {
        console.log(error)
    }
}