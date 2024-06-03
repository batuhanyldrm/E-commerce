import axios from "axios";

export const getOrders = async () => {
    const resp = await axios.get("http://localhost:8080/orders")
    return resp;
}
