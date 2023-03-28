import React, { } from 'react'
import { Button} from '@mui/material';
//import { makeStyles } from '@mui/styles';
import { connect } from 'react-redux';
import { postLogout } from './api/userApi';

/* const useStyles = makeStyles((theme) => ({
  userNavigation: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    '&:hover > div': {
      display: 'block',
    },
  },
  button: {
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    backgroundColor: '#2f455c',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    padding: '0px 8px',
    fontSize: '30px',
  },
  userMenuItems: {
    listStyle: 'none',
    background: 'white',
    color: '#000000',
    padding: '10px 20px',
    border: '1px solid #46B1C9',
    '& li': {
      marginBottom: '5px',
    },
    '& li:last-child': {
      marginBottom: '0px',
    },
    '& li a': {
      textDecoration: 'none',
      color: 'black',
    },
    display: 'block',
  },
  userNavigationContainer: {
    display: 'none',
    paddingTop: '38px',
    position: 'absolute',
    top: '0px',
    right: '0',
    width: '150px',
  },
  mainContainer: {
    display: 'grid',
    alignItems: 'center',
    gridTemplateColumns: 'auto auto auto auto',
  },
  limitedText: {
    width: '155px',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
  headerIconButton: {
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    backgroundColor: '#2f455c',
    color: '#ffffff',
    border: 'none',
    cursor: 'pointer',
    padding: '0px 8px',
    fontSize: '30px',
    zIndex: '1000',
  },
  messageLink: {
    textDecoration: 'none',
    color: 'white',
  },
  languageSelection: {
    marginRight: '120px',
  },
})); */

const AllProducts = (props) => {
  //const classes = useStyles();
  const userToken = document.cookie.split(';')
  .map(cookie => cookie.trim())
  .find(cookie => cookie.startsWith('user_token='))
  ?.split('=')[1];
    console.log(document.cookie,"yyy")

  //const {user,loginUser} = props

  

  return (
    <div>
      <Button>
        logout
      </Button>
    </div>
  )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
  postLogout: (user) => {
  dispatch(postLogout(user));
},
});

export default connect(mapStateToProps, mapDispatchToProps) (AllProducts)