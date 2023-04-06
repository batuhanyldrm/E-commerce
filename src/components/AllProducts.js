import React, { useEffect } from 'react'
import { Button} from '@mui/material';
//import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { postLogout } from './api/userApi';
import { loginUser } from './actions/userActions';

/* const useStyles = makeStyles((theme) => ({
})); */

const AllProducts = (props) => {
  //const classes = useStyles();
  const userToken = document.cookie.split(';')
  .map(cookie => cookie.trim())
  .find(cookie => cookie.startsWith('user_token='))
  ?.split('=')[1];

if (userToken) {
  const decodedToken = decodeURIComponent(userToken);
  try {
    const parsedToken = JSON.parse(JSON.stringify(decodedToken));
    const issuer = parsedToken.iss;
  } catch (e) {
    console.error('Error parsing JSON:', e);
  }
}

  const {user,loginUser} = props

  useEffect(() => {
    loginUser()
  }, [])
  

  return (
    <div>
      <Button>
        logout
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  postLogout: (user) => {
  dispatch(postLogout(user))
},
loginUser: (user) => {
  dispatch(loginUser(user));
},
});

export default connect(mapStateToProps, mapDispatchToProps) (AllProducts)