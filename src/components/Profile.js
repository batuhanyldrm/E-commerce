import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './actions/userActions';
import ResponsiveAppBar from './ResponsiveAppBar';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const useStyles = makeStyles((theme) => ({
  container: {
    display: "grid",
    margin: "auto",
    justifyContent: "center",
    border: "1px solid lightgray",
    maxWidth: "300px",
    padding: "20px",
    textAlign: "center",
    borderRadius: 5,
  },
  avatar: {
    marginBottom: "10px",
    marginLeft: "5%"
  },
  title: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "10px",
  },
  company: {
    display:"flex",
    justifyContent:"start",
    fontSize: "16px",
    marginBottom: "5px",
  },
  name: {
    display:"flex",
    justifyContent:"start",
    fontSize: "16px",
    marginBottom: "5px",
  },
  tel: {
    display:"flex",
    justifyContent:"start",
    fontSize: "14px",
    color: "gray",
    marginBottom: "5px",
  },
}));

const Profile = (props) => {
  const {
    user,
    loginUser
  } = props;

  const classes = useStyles();

  useEffect(() => {
    loginUser();
  }, [loginUser]);

  return (
    <>
      <ResponsiveAppBar />
      <div className={classes.container}>
        <div className={classes.avatar}>
          <Avatar style={{ width: 100, height: 100 }} src="/static/images/avatar/2.jpg" />
        </div>
        <div className={classes.title}>Profile</div>
        <div className={classes.company}>Company: {user ? user.company : ''}</div>
        <div className={classes.name}>Name: {user ? `${user.name} ${user.surname}` : ''}</div>
        <div className={classes.tel}>Email: {user ? user.email : ''}</div>
        <div className={classes.tel}>Tel: {user ? user.tel : ''}</div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: () => {
    dispatch(loginUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
