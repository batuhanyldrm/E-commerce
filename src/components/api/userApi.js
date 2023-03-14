import axios from "axios";

export const postRegister = async (data) => {
    const resp = await axios.post("hhtp://localhost:3001/register", {
        company: data.company,
        name: data.name,
        surname: data.surname,
        email: data.email,
        password: data.password,
        tel: data.tel,
        role: data.role
    })

    return resp
}



export const getProducts = async () => {
    const resp = await axios.get("http://localhost:3001/stocks")
    return resp;
}