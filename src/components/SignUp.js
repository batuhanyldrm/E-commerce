import {useEffect, useState} from 'react';
import { connect } from 'react-redux';
import TextField from '@mui/material/TextField';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import { postLogin, postRegister } from './api/userApi';
import { loginUser } from './actions/userActions';
import MuiPhoneNumber from 'material-ui-phone-number';
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

const SignUp = (props) => {

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
    const [loginPassword, setLoginPassword] = useState("");

    const [redirect, setRedirect] = useState(false)
    const [company, setCompany] = useState([]);
    const [role, setRole] = useState("");

    const createUser = async () => {
        const data = {
            /* company: company, */
            name: name,
            surname: surname,
            email: email,
            password: password,
            tel: phone,
            /* role: role, */
        }
        try {
            await postRegister(data)
            /* .then((res) => {
                    console.log(res,"başarılı")
                    addUser(res.data)
                }).finally((err) => {
                    console.log(err, "error")
                }) */
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
                  window.location = window.location.origin + "/allProducts";
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
            <video className={classes.video} autoPlay muted loop id="background-video">
                <source src={loginVideo} type="video/mp4" />
            </video>
            <CssVarsProvider>
      <main>
        <ModeToggle />
        <Sheet
          sx={{
            width: 300,
            mx: 'auto', // margin left & right
            my: 4, // margin top & bottom
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
            <Typography level="body2">Sign in to continue.</Typography>
          </div>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              // html input attribute
              name="email"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              // html input attribute
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          <Button sx={{ mt: 1 /* margin top */ }} onClick={createUser}>Sign up</Button>
          <Typography
            endDecorator={<Link href="/login">Login</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Want to login your account?
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
    loginUser: (user) => {
    dispatch(loginUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps) (SignUp)