import { useQuery } from "@tanstack/react-query"
import { getAllProducts, getOneProduct } from "../service/product"
type props ={
    id?:string,
    page?:number,
    limit?:number,
}
const useProductQuery = ({id,page,limit}:props) => {
    const { data } = useQuery({
        queryKey: ['products', id,page],
        queryFn: async () => {
            return id ? await getOneProduct(id) : await getAllProducts(page,limit);
        }
    })
    return { data }
}
export default useProductQuery
