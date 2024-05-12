import axios from "axios";

export const getProducts = async () => {
    const resp = await axios.get("http://localhost:8080/stocks")
    return resp;
}

export const getProduct = async (id) => {
    const resp = await axios.get(`http://localhost:8080/stocks/${id}`)
    return resp;
}

export const getSearch = async (data) => {
    const resp = await axios.get(`http://localhost:8080/search?q=${data}`)
    return resp;
}

export const getSingleImage = async (id) => {
    const resp = await axios.get(`http://localhost:8080/image/${id}`)
    return resp;
}

export const postProduct = async (formData) => {
    try {
      const resp = await axios.post("http://localhost:8080/stocks", formData, {
      });
      return resp;
    } catch (error) {
      throw error;
    }
  };

export const removeProduct = async (id) => {
    const resp = await axios.delete(`http://localhost:8080/stocks/${id}`)
    return resp;
}

export const changeStock = async (data) => {
   
    const resp = await axios.put(`http://localhost:8080/stocks/${data.id}`, {
        productName: data.productName,
        productCode: data.productCode,
        size: data.size,
        color: data.color,
        description: data.description,
        price: data.price,
        amount: data.amount,
    })
    return resp; 
}

export const updateProductAmount = async (id, amount) => {
    const resp = await axios.put(`http://localhost:8080/stocks/${id}/amount`, {
        amount
    })
    return resp;
}
