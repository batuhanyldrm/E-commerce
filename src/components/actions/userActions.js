import { ADD_USER, LOGIN_USER } from "./types";

export const addUser = (user) => (
    dispatch
    ) => {
        dispatch({
            type: ADD_USER,
            payload: user
        })
    }

export const loginUser = (user) => (
dispatch
) => {
    dispatch({
        type: LOGIN_USER,
        payload: user
    })
}    