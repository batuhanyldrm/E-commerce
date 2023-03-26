/* import axios from 'axios';
import jwt from 'jsonwebtoken';

export const createBearerToken = () => {
  const bearerToken = `Bearer ${getCookie('user_token')}`;
  return bearerToken;
};


const checkUserToken = () => {
  if (getCookie('user_token')) {
    return true;
  } else {
    return false;
  }
};


export const checkAuthentication = async (apiUrl) => {
  if (!checkUserToken()) {
    return false;
  }

  try {
    const bearerToken = createBearerToken();

    await axios.get(`${apiUrl}/users/${getUserId()}/companies`, {
      headers: {
        Authorization: bearerToken,
      },
    });
  } catch (e) {
    return false;
  }

  return true;
};



const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
};


export const getUserId = () => {
  const parsedToken = jwt.decode(getCookie('user_token'));
  return parsedToken.userId;
}; */