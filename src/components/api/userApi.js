import axios from "axios";

export const postRegister = async ({company, name, surname, email, password, tel, role}) => {
    const resp = await axios.post("http://localhost:3001/register", {
        company: company,
        name: name,
        surname: surname,
        email: email,
        password: password,
        tel: tel,
        role: role,
    })

    return resp;
}