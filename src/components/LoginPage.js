import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import FormControl from '@mui/material/FormControl';

const LoginPage = () => {

    const [showPassword, setShowPassword] = React.useState(false);

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
                    />
                </div>

                <div style={{ width:"380px",marginBottom:"10px",}}>

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
                    />
                </FormControl>
                </div>
                <Button 
                    style={{width:"380px"}} 
                    disableElevation 
                    variant="contained"
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
                />

                <TextField 
                    style={{
                        width:"380px",
                        marginBottom:"10px"
                    }} 
                    id="outlined-basic" 
                    label="E-mail" 
                    variant="outlined"
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
                    />

                    <TextField 
                        style={{
                            width:"380px",
                            marginBottom:"10px"
                        }} 
                        id="outlined-basic" 
                        label="Role" 
                        variant="outlined" 
                    />

                </div>
                <Button 
                    style={{width:"380px"}} 
                    disableElevation 
                    variant="contained"
                >
                    Register
                </Button>
            </div>
            <div style={{width:"1px", backgroundColor:"gray"}}></div>
        </div>
    </>
  )
}

export default LoginPage