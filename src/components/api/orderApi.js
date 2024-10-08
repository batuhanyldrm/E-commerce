import axios from "axios";

export const getOrders = async () => {
    const resp = await axios.get("http://localhost:8080/orders")
    return resp;
}

export const postOrder = async (id, order) => {
	const resp = await axios.post(`http://localhost:8080/stocks/${id}`, order, {});
	return resp.status === 201 ? resp : false
};