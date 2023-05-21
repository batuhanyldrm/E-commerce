import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { loginUser } from './actions/userActions';
import ResponsiveAppBar from './ResponsiveAppBar';
import Avatar from '@mui/material/Avatar';

const Profile = (props) => {

    const {
        user,
        loginUser
    } = props;


    useEffect(() => {
          loginUser()
      }, [])

  return (
    <>
        <ResponsiveAppBar/>
        <div style={{display:"grid",justifyContent:"center"}}>
            <Avatar  src="/static/images/avatar/2.jpg" />
            <div>Profile</div>
            <div>{user.name}   {user.surname}</div>
            <div>{user.tel}</div>
        </div>
    </>
  )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
  });
  
  const mapDispatchToProps = (dispatch) => ({
    loginUser: () => {
        dispatch(loginUser());
      },
  });

export default connect(mapStateToProps, mapDispatchToProps) (Profile)