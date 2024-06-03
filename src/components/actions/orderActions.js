import { getOrders } from "../api/orderApi";
import { FETCH_ORDERS } from "./types";

export const fetchOrders = () => async (
	dispatch
) => {
	const resp = await getOrders()
	dispatch({
		type: FETCH_ORDERS,
		payload: resp.data
	})
}