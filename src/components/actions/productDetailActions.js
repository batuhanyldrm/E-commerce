import { getProduct } from "../api/productApi"
import { FETCH_PRODUCT } from "./types"

export const fetchProduct = (id) => async (
    dispatch
) => {
    const resp = await getProduct(id)
        dispatch({
            type: FETCH_PRODUCT,
            payload: resp.data
        })
    
}