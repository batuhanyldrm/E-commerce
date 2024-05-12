import axios from "axios";

export const postRegister = async ({name, surname, email, password, tel}) => {
    const resp = await axios.post("http://localhost:8080/register", {
        name: name,
        surname: surname,
        email: email,
        password: password,
        tel: tel,
    })

    return resp.status === 201 ? resp : false
}
export const postLogin = async ({ email, password }) => {
    const resp = await axios.post(
      "http://localhost:8080/login",
      { email, password },
      { withCredentials: true }
    );
    return resp.status === 201 ? resp : false;
  };

export const postLogout = async () => {
    const resp = await axios({
        method: "post",
        url: "http://localhost:8080/logout",
        withCredentials: true
     });

    return resp.status === 201 ? resp : false
}

export const getUser = async () => {
    const resp = await axios.get(`http://localhost:8080/user`,
        {withCredentials: true}
    )
    return resp;
}

export const updateUserApi = async (data) => {
   
    const resp = await axios.put(`http://localhost:8080/user/${data.id}`, {
        company: data.company,
        name: data.name,
        surname: data.surname,
        email: data.email,
        tel: data.tel,
    })
    return resp; 
}

