import * as React from 'react';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { postLogin } from './api/userApi';
import loginVideo from "./video/login.mp4"
import { makeStyles } from '@mui/styles';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import { Link } from 'react-router-dom';
import IconButton from '@mui/joy/IconButton';
import { Alert, Snackbar } from '@mui/material';


function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  return (
    <Button 
      size='sm'
      style={{marginLeft:10}}
      variant="outlined"
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'light' ? 'Turn dark' : 'Turn light'}
    </Button>
  );
}

const useStyles = makeStyles((theme) => ({
    video:{
        position: "fixed",
        top: 0,
        left: 0,
        minWidth: "100%",
        minHeight: "100%",
        zIndex: -1,
        background: "#110313",
        mixBlendMode: "overlay",
    },
}));

const LoginPage = (props) => {

  const {user} = props;
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [alert, setAlert] = useState({ open: false, message: "", status: "" });

  const handleloginUser = async () => {
      const data = {
          email: loginEmail,
          password: loginPassword,
      }
      try {
          await postLogin(data).then((res) => {
              setTimeout(() => {
                window.location = window.location.origin + "/all-products";
              }, 500);
            })
      } catch (error) {
        setAlert({ open: true, message: "Wrong email or password", status: "error" })
          console.log(error, "catch error")
      }
      setRedirect(true)
  }

  const checkUserSession = () => {
    const loggedInUser = document.cookie.includes("user_token");
  
    if (loggedInUser) {
      // Kullanıcı oturumu açık, "all-products" sayfasına yönlendir
      window.location = window.location.origin + "/all-products";
    } else {
      // Kullanıcı oturumu kapalı, normal akışa devam et
      // ...
    }
  };
  
  // Sayfa yüklendiğinde oturum kontrolü yap
  checkUserSession();

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
};

  return (
    <>
      <video className={classes.video} autoPlay muted loop id="background-video">
        <source src={loginVideo} type="video/mp4" />
      </video>
      <Link to="/all-products">
        <Button variant="outlined" style={{borderRadius:20, }}>Products</Button>,
      </Link>
      <CssVarsProvider>
      <main>
            <Sheet
              sx={{
                width: 300,
                mx: 'auto', // margin left & right
                my: 7, // margin top & bottom
                py: 3, // padding top & bottom
                px: 2, // padding left & right
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                borderRadius: 'sm',
                boxShadow: 'md',
              }}
              variant="outlined"
            >
              <div>
                <Typography level="h4" component="h1">
                  <b>Welcome to Qasis</b>
                </Typography>
                <Typography level="body2">
                  Sign in to continue.
                  <ModeToggle />
                </Typography>
              </div>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  // html input attribute
                  name="email"
                  type="email"
                  placeholder="qasis@gmail.com"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel>Password</FormLabel>
                <Input
                  // html input attribute
                  name="password"
                  placeholder="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}              
                  endDecorator={
                    <IconButton 
                      variant="plain" 
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  }
                />
              </FormControl>

              <Button sx={{ mt: 1}} onClick={handleloginUser}>Log in</Button>
              <Typography
                endDecorator={<Link to="/sign-up">Sign up</Link>}
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
              >
                Don&apos;t have an account?
              </Typography>
            </Sheet>
      </main>
    </CssVarsProvider>
    <Snackbar
      open={alert.open}
      autoHideDuration={3000}
      onClose={() => setAlert({ open: false, message: "", status: "" })}
    >
      <Alert severity={alert.status || "info"}>{alert.message}</Alert>
    </Snackbar>
    </>
  )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
});

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage)
