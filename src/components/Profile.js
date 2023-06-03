import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { loginUser } from './actions/userActions';
import ResponsiveAppBar from './ResponsiveAppBar';
import Avatar from '@mui/material/Avatar';
import { makeStyles } from '@mui/styles';
import { Button, Typography } from '@mui/material';

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
    marginLeft: "5%",
    display:"flex",
    justifyContent:"center"
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
          <Avatar style={{ width: 100, height: 100 }}>
          <Typography variant="h4" style={{ fontSize: 40 }}>
            {`${user.name && user.name.charAt(0)}${user.surname &&user.surname.charAt(0)}`}
          </Typography>
          </Avatar>
        </div>
        <div className={classes.title}>Profile</div>
        {user.company ? 
          <div className={classes.company}>Company: {user.company}</div> : ""
        }
        <div className={classes.name}>Name: {user.name}</div>
        <div className={classes.name}>Surname: {user.surname}</div>
        <div className={classes.tel}>Email: {user.email}</div>
        <div className={classes.tel}>Tel: {user.tel}</div>
      </div>
      <Button style={{
        display:"grid",
        margin:"auto",
        marginTop:10,
        maxWidth:340,
        color: 'rgba(186,130,57,255)',
        borderColor: 'rgba(186,130,57,255)',
        }}
        variant='outlined'
        fullWidth
      >
        Edit
      </Button>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
  loginUser: () => {
    dispatch(loginUser());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
