import { useQuery } from "@tanstack/react-query"
import { getAllTypes, getOneType } from "../service/type";

const useTypeQuery = (id?: string) => {
    const { data } = useQuery({
        queryKey: ['types', id],
        queryFn: async () => {
            return id ? await getOneType(id) : await getAllTypes();
        }
    })
    return { data }
}
export default useTypeQuery
