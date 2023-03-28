/* import { getUser } from "../api/userApi"; */
import { ADD_USER, LOGIN_USER } from "./types";

export const addUser = (user) => (
    dispatch
    ) => {
        dispatch({
            type: ADD_USER,
            payload: user
        })
    }

/* export const loginUser = () => async (
dispatch
) => {
    const resp = await getUser()
    dispatch({
        type: LOGIN_USER,
        payload: resp.data
    })
}     */