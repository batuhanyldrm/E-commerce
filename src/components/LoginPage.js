import React, {useState} from 'react';
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

const LoginPage = (props) => {

    const {/* addUser */} = props;

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
    /* onst [company, setCompany] = useState([]);
    const [role, setRole] = useState(""); */

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

    const loginUser = async () => {
        const data = {
            email: loginEmail,
            password: loginPassword,
        }
        try {
            await postLogin(data).then(() => {
                setTimeout(() => {
                  window.location = window.location.origin + "/allProducts";
                }, 3000);
              })
        } catch (error) {
            console.log(error, "catch error")
        }
        setRedirect(true)
    }


    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

  return (
    <>
        <div style={{display:"flex", justifyContent:"space-between"}}>
            <div style={{display:"block"}}>

                <div style={{marginBottom:"10px"}}>
                    <TextField 
                        style={{width:"380px"}} 
                        id="outlined-basic" 
                        label="E-mail" 
                        variant="outlined"
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
                    onClick={() => loginUser()}
                >
                    Login
                </Button>
            </div>

            <div style={{width:"1px", backgroundColor:"gray"}}></div>

            <div style={{display:"block"}}>

                <div style={{marginBottom:"10px"}}>
                    <TextField 
                        style={{
                            width:"380px",
                            marginBottom:"10px"
                        }} 
                        id="outlined-basic" 
                        label="Name" 
                        variant="outlined"
                        value={name} 
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div style={{marginBottom:"10px", maxWidth:"380px"}}>

                <TextField 
                    style={{
                        width:"380px",
                        marginBottom:"10px"
                    }} 
                    id="outlined-basic" 
                    label="Surname" 
                    variant="outlined"
                    type="text"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                />

                <TextField 
                    style={{
                        width:"380px",
                        marginBottom:"10px"
                    }} 
                    id="outlined-basic" 
                    label="E-mail" 
                    variant="outlined"
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                    <FormControl variant="outlined">
                        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                        <OutlinedInput style={{ width:"380px",marginBottom:"10px",}}
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
                        <OutlinedInput style={{ width:"380px",marginBottom:"10px",}}
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
                            width:"380px",
                            marginBottom:"10px"
                        }} 
                        id="outlined-basic" 
                        label="Phone" 
                        variant="outlined"
                        type="text"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)} 
                    />
                    <TextField 
                        style={{
                            width:"380px",
                            marginBottom:"10px"
                        }} 
                        id="outlined-basic" 
                        label="Company" 
                        variant="outlined"
                        type="text"
                        /* value={company}
                        onChange={(e) => setCompany(e.target.value)} */
                    />

                    <TextField 
                        style={{
                            width:"380px",
                            marginBottom:"10px"
                        }} 
                        id="outlined-basic" 
                        label="Role" 
                        variant="outlined"
                        type="text"
                       /*  value={role}
                        onChange={(e) => setRole(e.target.value)} */
                    />

                </div>
                <Button 
                    style={{width:"380px"}} 
                    disableElevation 
                    variant="contained"
                    onClick={() => createUser()}
                >
                    Register
                </Button>
            </div>
            <div style={{width:"1px", backgroundColor:"gray"}}></div>
        </div>
    </>
  )
}

const mapStateToProps = (state) => ({
});

const mapDispatchToProps = (dispatch) => ({
   /*  addUser: (user) => {
    dispatch(addUser(user));
  }, */
});

export default connect(mapStateToProps, mapDispatchToProps) (LoginPage)