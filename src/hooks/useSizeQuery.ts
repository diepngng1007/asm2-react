import { useQuery } from "@tanstack/react-query"
// import { getAllTypes, getOneType } from "../service/type";
import { getAllSize } from "../service/size";

const useSizeQuery = (id?: string) => {
    const { data } = useQuery({
        queryKey: ['size', id],
        queryFn: async () => {
            return await getAllSize();
        }
    })
    return { data }
}
export default useSizeQuery
