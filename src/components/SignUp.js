import {useEffect, useState} from 'react';
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

const SignUp = (props) => {

    const {} = props;
    const classes = useStyles();

    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");

    //const [redirect, setRedirect] = useState(false)
    //const [company, setCompany] = useState([]);
    //const [role, setRole] = useState("");

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

    //const handleClickShowPassword = () => setShowPassword((show) => !show);

    //const handleMouseDownPassword = (event) => {
    //    event.preventDefault();
    //};

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
              <b>Welcome!</b>
            </Typography>
            <Typography level="body2">
              Sign in to continue.
              <ModeToggle />
            </Typography>
          </div>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              // html input attribute
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
              // html input attribute
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
          <FormControl>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              // html input attribute
              name="Confirm Password"
              type="Confirm Password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Phone</FormLabel>
            <Input
              // html input attribute
              name="phone"
              type="phone"
              placeholder="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>

          <Button sx={{ mt: 1 }} onClick={createUser}>Sign up</Button>
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