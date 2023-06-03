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
import { postLogout } from './api/userApi';
import { connect } from 'react-redux';
import logo from "./logo/aslan2.png"
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { makeStyles } from '@mui/styles';
import Carts from './cart/Carts';

const useStyles = makeStyles((theme) => ({
  cart: {
    "&:hover": {
      color:"rgba(186,130,57,255)"
    },
  },
  logo: {
    textDecoration:"none",
    color:"white"
  }
}));

const pages = ['Products', 'Pricing', 'Blog'];

function ResponsiveAppBar(props) {

  const {user} = props
  const classes = useStyles();

  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const [carts, setCarts] = useState(false)

  const userLogout = async () => {
    try {
      await postLogout()
      setTimeout(() => {
        window.location = window.location.origin + "/login";
      }, 500);
    } catch (error) {
      console.log(error,"error")
    }
  }

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

  const handleChange = () => {
    setCarts((prev) => !prev);
  };

  return (
    <>
    <Carts open={carts} close={handleChange} />
    <AppBar position="sticky" sx={{marginBottom:2, backgroundColor:"rgba(39,38,152,255)"}}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to='/all-products'>
          <img src={logo}  style={{maxWidth:70, maxHeight:70}} />
          </Link>
          <Link className={classes.logo} to={"/all-products"}>
          <Typography
            variant="h6"
            noWrap
            component="a"
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
          </Link>
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

          <IconButton size='small' style={{color:"white"}} sx={{ p: 0, marginRight:1 }} onClick={() => setCarts(true)}>
            <ShoppingCartOutlinedIcon className={classes.cart}/>
          </IconButton>
          <Box sx={{ flexGrow: 0 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Typography style={{ textAlign: "center", marginRight:5 }}>
              {user.name}
            </Typography>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{  }}>
                  {user && user.name && user.surname && `${user.name.charAt(0)}${user.surname.charAt(0)}`}
                </Avatar>
              </IconButton>
            </Tooltip>
          </div>
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
               {document.cookie.includes("user_token") ? (
                <div>
                <MenuItem component={Link} to="/profile"  onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                {user.company ?
                <MenuItem component={Link} to="/stock" onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Account</Typography>
                </MenuItem> : ""
                }
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
    </>
  );
}

const mapStateToProps = (state) => ({
  user: state.user,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps) (ResponsiveAppBar);