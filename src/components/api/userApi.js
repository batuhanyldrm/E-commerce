import axios from "axios";
import { createBearerToken, getUserId } from "./auth";

export const postRegister = async ({name, surname, email, password, tel}) => {
    const resp = await axios.post("http://localhost:3001/register", {
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
      "http://localhost:3001/login",
      { email, password },
      { withCredentials: true }
    );
    return resp.status === 201 ? resp : false;
  };

export const postLogout = async () => {
    const resp = await axios({
        method: "post",
        url: "http://localhost:3001/logout",
        withCredentials: true
     });

    return resp.status === 201 ? resp : false
}

export const getUser = async () => {
    const resp = await axios.get(`http://localhost:3001/user`,
        {withCredentials: true}
    )
    return resp;
}

