import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { postLogout } from './api/userApi';
import { connect } from 'react-redux';
import logo from "./logo/aslan2.png"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  cart: {
    "&:hover": {
      color:"rgba(186,130,57,255)"
    },
  }
}));

const pages = ['Products', 'Pricing', 'Blog'];

function ResponsiveAppBar(props) {

  const {} = props

  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [redirect, setRedirect] = useState(false)

  const userLogout = async () => {
    try {
      await postLogout()
      setTimeout(() => {
        window.location = window.location.origin + "/login";
      }, 500);
      setRedirect(true);
    } catch (error) {
      console.log(error,"error")
    }
  }
  /* const userLogout = async () => {
    try {
      document.cookie = "user_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      if (!document.cookie) {
        setTimeout(() => {
          window.location = window.location.origin + "/login";
        }, 500);
        setRedirect(true);
      }else{
        console.log("error");
      }
    } catch (error) {
      console.log(error, "catch error");
    }
  }; */


  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="sticky" sx={{marginBottom:2, backgroundColor:"rgba(39,38,152,255)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <a href='/all-products'>
          <img src={logo}  style={{maxWidth:70, maxHeight:70}} />
          </a>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/all-products"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
              marginLeft:2
            }}
          >
            Qasis
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography href="/" textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <IconButton style={{color:"white"}} sx={{ p: 2 }}>
            <ShoppingCartOutlinedIcon className={classes.cart}/>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar  src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
               {document.cookie ? (
                <div>
                <MenuItem component={Link} to="/profile"  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/stock" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem>
                <MenuItem component={Link} to="" onClick={userLogout}>
                  <Typography textAlign="center">Logout</Typography>
                </MenuItem>
                </div>
                ) : (
                  <div>
                <MenuItem component={Link} to="/login"  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem component={Link} to="/sign-up" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
                </div>
                )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveAppBar);