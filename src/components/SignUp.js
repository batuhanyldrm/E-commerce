import { useEffect, useState} from 'react';
import { connect } from 'react-redux';
import { postRegister } from './api/userApi';
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
import { Visibility, VisibilityOff } from '@mui/icons-material';
import IconButton from '@mui/joy/IconButton';
import { Alert, Snackbar } from '@mui/material';

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

const SignUp = (props) => {

    const {} = props;
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMatchError, setPasswordMatchError] = useState(false);
    const [phone, setPhone] = useState("");
    const [alert, setAlert] = useState({ open: false, message: "", status: "" });

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
      setPasswordMatchError(e.target.value !== confirmPassword);
    };
  
    const handleConfirmPasswordChange = (e) => {
      setConfirmPassword(e.target.value);
      setPasswordMatchError(e.target.value !== password);
    };

    const createUser = async () => {
      if (password !== confirmPassword) {
        setPasswordMatchError(true)
        return
      }
        const data = {
            name: name,
            surname: surname,
            email: email,
            password: password,
            tel: phone,
        }
        try {
            await postRegister(data)
        } catch (error) {
            console.log(error, "catch error")
        }
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event) => {
      event.preventDefault();
    };

    const validateEmail = (email) => {
      const emailRegex = /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/;
      return emailRegex.test(email);
    };
    const validateName = (name) => {
      const fullnameRegex = /^[a-zA-Z ]{2,40}$/;
      return fullnameRegex.test(name);
    };

    const validateSurName = (surname) => {
      const fullnameRegex = /^[a-zA-Z ]{2,40}$/;
      return fullnameRegex.test(surname);
    };

    const validatePassword = (password) => {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/;
      return passwordRegex.test(password);
    };
  
    const handleCreateUser = () => {
      if (!validateName(name)) {
        setAlert({ open: true, message: "Invalid name format", status: "error" });
      }else if (!validateName(surname)) {
        setAlert({ open: true, message: "Invalid surname format", status: "error" });
      }else if (!validateEmail(email)) {
        setAlert({ open: true, message: "Invalid email format", status: "error" });
        return;
      } else if (!validatePassword(password)) {
        setAlert({ open: true, message: "Invalid password format", status: "error" });
      }else{
        createUser();
        setAlert({ open: true, message: "User succesfully registered", status: "success" });
      }
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
            py: 2, // padding top & bottom
            px: 2, // padding left & right
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
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
            <FormLabel>Name</FormLabel>
            <Input
              name="name"
              type="name"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Surname</FormLabel>
            <Input
              name="surname"
              type="surname"
              placeholder="surname"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="qasis@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              placeholder="password"
              value={password}
              onChange={handlePasswordChange}
              error={passwordMatchError}
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
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              name="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              error={passwordMatchError}
              type={showConfirmPassword ? 'text' : 'password'}              
              endDecorator={
                <IconButton 
                  variant="plain" 
                  onClick={handleClickShowConfirmPassword}
                  onMouseDown={handleMouseDownConfirmPassword}>
                  {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              }
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              name="phone"
              type="phone"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value.slice(0, 11))}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={handleCreateUser}>Sign up</Button>
          <Typography
            endDecorator={<Link href="/login">Sign in</Link>}
            fontSize="sm"
            sx={{ alignSelf: 'center' }}
          >
            Want to login your account?
          </Typography>
        </Sheet>
      </main>
    </CssVarsProvider>
      <Snackbar
        open={alert.open}
        autoHideDuration={1000}
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
    loginUser: (user) => {
    dispatch(loginUser(user));
  },
});

export default connect(mapStateToProps, mapDispatchToProps) (SignUp)