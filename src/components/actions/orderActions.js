import { getOrders } from "../api/orderApi";
import { ADD_ORDER, FETCH_ORDERS } from "./types";

export const fetchOrders = () => async (
	dispatch
) => {
	const resp = await getOrders()
	dispatch({
		type: FETCH_ORDERS,
		payload: resp.data
	})
}

export const addOrder = (order) => async (
    dispatch
) => {
    dispatch({
        type: ADD_ORDER,
        payload: order
    })
}