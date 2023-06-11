import { getUser } from "../api/userApi";
import { LOGIN_USER, UPDATE_USER } from "./types";

export const loginUser = () => async (
dispatch
) => {
    const resp = await getUser()
    dispatch({
        type: LOGIN_USER,
        payload: resp.data
    })
}

export const updateUser = (data) => async (
    dispatch
) => {
    dispatch({
        type: UPDATE_USER,
        payload: data
    })
}