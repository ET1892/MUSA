import { useState } from "react";
import { Button, InputAdornment, Input, FormControl, InputLabel, IconButton} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Auth.css'
import { Link, useNavigate } from "react-router-dom";
import { useAuth }from './AuthContext'
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();

    const { signIn } = useAuth();
    
    const HandleSignIn= async (e: any) => {
        e.preventDefault();
        try{
            await signIn(email, password);
            setPasswordError(false);
            navigate('/account');
        }
        catch(error: any){
            setPasswordError(true);
            console.error(error);
        }
    };
    return (
        <div>
            <header>
                <h1>MUSA</h1>
                <h4>Maynooth University Space Administration </h4>
            </header>
            <body>
            <h1>Sign In</h1>
            <div>
                <FormControl variant="standard">
                    <InputLabel htmlFor="input-with-icon-adornment">
                        Email
                    </InputLabel>
                    <Input
                        sx={{
                            width: '300px',
                            height: '50px',
                        }}
                        id="input-with-icon-adornment"
                        defaultValue="normal"
                        startAdornment={
                            <InputAdornment position="start">
                            <AccountCircle />
                            </InputAdornment>
                        }
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </FormControl>
            </div>
            <div>            
                <FormControl  variant="standard">
                    <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                    <Input  
                    sx={{
                        width: '300px',
                        height: '50px',
                    }}
                    defaultValue="normal"
                    error={passwordError}
                    id="standard-adornment-password"
                    type={showPassword ? 'text' : 'password'}
                    endAdornment={
                        <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                        </InputAdornment>
                    }
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </FormControl>
            </div>
            <br />
            <div className="buttonTypes">
                <div>
                    <Button variant="contained" size="large" onClick={HandleSignIn}>Sign in</Button>
                </div>
            </div>
            <div>
                <p>
                    Don't have an account with us? <Link to="/signUp">Sign up</Link>
                </p>
            </div>
            </body>
      </div>
    );

};
//rafce quick snippet for creating a functional component
export default SignIn;