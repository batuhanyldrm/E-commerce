import axios from "axios";

export const postRegister = async ({name, surname, email, password, tel, company, role}) => {
    const resp = await axios.post("http://localhost:3001/register", {
        name: name,
        surname: surname,
        email: email,
        password: password,
        tel: tel,
        /* company: company,
        role: role, */
    })

    return resp.status === 201 ? resp : false
}
export const postLogin = async ({email, password}) => {
    const resp = await axios.post("http://localhost:3001/login", {
        email: email,
        password: password,
    }, {withCredentials: true})

    return resp.status === 201 ? resp : false
}

export const postLogout = async ({name, surname, email, password, tel, company, role}) => {
    const resp = await axios.post("http://localhost:3001/login", {
        email: email,
    })

    return resp.status === 201 ? resp : false
}