import axios from 'axios';

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
  var key, value, i;
  var cookieArray  = document.cookie.split(';');

  for (i = 0; i < cookieArray.length; i++){
      key = cookieArray[i].substr(0, cookieArray[i].indexOf("="));
      value = cookieArray[i].substr(cookieArray[i].indexOf("=")+1);

      if (key == 'email'){
          alert('Email is ' + value);
      }

      if (key == 'userID'){
          alert('userID is ' + value);
      }
  }
};