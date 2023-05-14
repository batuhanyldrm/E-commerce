/* import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';
import { postLogin, postRegister } from './api/userApi';
import { loginUser } from './actions/userActions';
import MuiPhoneNumber from 'material-ui-phone-number';
import loginVideo from "./video/login.mp4"
import { makeStyles } from '@mui/styles';

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

    const {user,loginUser} = props;
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("")
    const [redirect, setRedirect] = useState(false)
    const [company, setCompany] = useState([]);
    const [role, setRole] = useState("");

    const createUser = async () => {
        const data = {
            //company: company,
            name: name,
            surname: surname,
            email: email,
            password: password,
            tel: phone,
            //role: role,
        }
        try {
            await postRegister(data)
            // .then((res) => {
            //        console.log(res,"başarılı")
              //      addUser(res.data)
              //  }).finally((err) => {
               //     console.log(err, "error")
               // }) 
        } catch (error) {
            console.log(error, "catch error")
        }
    }

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
            console.log(error, "catch error")
        }
        setRedirect(true)
    }
    useEffect(() => {
        loginUser()
      }, [])

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  return (
    <>
        <div style={{display:"flex", justifyContent:"space-around"}}>
            <video className={classes.video} autoPlay muted loop id="background-video">
                <source src={loginVideo} type="video/mp4" />
            </video>
            <div style={{display:"block"}}>

                <div style={{marginBottom:"10px"}}>
                    <TextField
                        style={{width:"380px"}} 
                        id="outlined-basic" 
                        label="E-mail" 
                        variant="outlined"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                    />
                </div>

                <div style={{ width:"380px",marginBottom:"10px",}}>

                <FormControl variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput style={{ width:"380px",marginBottom:"10px",}}
                        id="outlined-adornment-password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                </div>
                <Button
                    style={{width:"380px"}} 
                    disableElevation 
                    variant="contained"
                    onClick={() => handleloginUser()}
                >
                    Login
                </Button>
            </div>

            <div style={{width:"1px", backgroundColor:"gray"}}></div>

            <div style={{display:"block"}}>

                <div style={{marginBottom:"10px"}}>
                    <TextField 
                        style={{
                            maxWidth:"380px",
                            marginBottom:"10px",
                            marginRight:"5px"
                        }} 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField 
                    style={{
                        maxWidth:"380px",
                        marginBottom:"10px"
                    }} 
                    id="outlined-basic" 
                    label="Surname" 
                    variant="outlined"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />
                </div>

                <div style={{marginBottom:"10px", maxWidth:"380px"}}>

                <TextField 
                    style={{
                        width:"395px",
                        marginBottom:"10px"
                    }} 
                    id="outlined-basic" 
                    label="E-mail" 
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput style={{ width:"395px",marginBottom:"10px",}}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            
                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </FormControl>
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                        <OutlinedInput style={{ width:"395px",marginBottom:"10px",}}
                            id="outlined-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            


                            endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                            }
                            label="Confirm Password"
                            //onChange={(e) => setName(e.target.value)}
                        />
                    </FormControl>

                    <TextField
                        style={{
                            width:"395px",
                            marginBottom:"10px"
                        }} 
                        value={phone}
                        onChange={(value) => setPhone(value)}
                        InputProps={{
                        inputComponent: MuiPhoneNumber,
                        inputProps: {
                            locale: 'tr',
                            defaultCountry: 'tr',
                            format: '+## ### ### ## ##'
                        },
                        disableUnderline: true,
                        }}
                    />
                   <TextField 
                        style={{
                            width:"395px",
                            marginBottom:"10px"
                        }} 
                        id="outlined-basic" 
                        label="Company" 
                        variant="outlined"
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />

                    <TextField 
                        style={{
                            width:"395px",
                            marginBottom:"10px"
                        }} 
                        id="outlined-basic" 
                        label="Role" 
                        variant="outlined"
                        type="text"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                    />

                </div>
                <Button 
                    style={{width:"395px"}} 
                    disableElevation 
                    variant="contained"
                    onClick={() => createUser()}
                >
                    Register
                </Button>
            </div>
        </div>
    </>
  )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
    loginUser: (user) => {
    dispatch(loginUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage) */


import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { postLogin } from './api/userApi';
/* import { loginUser } from './actions/userActions'; */
import loginVideo from "./video/login.mp4"
import { makeStyles } from '@mui/styles';
import * as React from 'react';
import { CssVarsProvider, useColorScheme } from '@mui/joy/styles';
import Sheet from '@mui/joy/Sheet';
import Typography from '@mui/joy/Typography';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';
import Link from '@mui/joy/Link';
import IconButton from '@mui/joy/IconButton';


function ModeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = React.useState(false);

  // necessary for server-side rendering
  // because mode is undefined on the server
  React.useEffect(() => {
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

  const {user,loginUser} = props;
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("")
  const [redirect, setRedirect] = useState(false)

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

  useEffect(() => {
      /* loginUser() */
    }, [])

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
      event.preventDefault();
};

  return (
    <>
            <video className={classes.video} autoPlay muted loop id="background-video">
                <source src={loginVideo} type="video/mp4" />
            </video>
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
                  <b>Welcome!</b>
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
                  placeholder="johndoe@email.com"
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
                endDecorator={<Link href="/sign-up">Sign up</Link>}
                fontSize="sm"
                sx={{ alignSelf: 'center' }}
              >
                Don&apos;t have an account?
              </Typography>
            </Sheet>
      </main>
    </CssVarsProvider>
    </>
  )
}

const mapStateToProps = (state) => ({
    user: state.user.user,
});

const mapDispatchToProps = (dispatch) => ({
   /*  loginUser: (user) => {
    dispatch(loginUser(user));
  }, */
});

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage)
