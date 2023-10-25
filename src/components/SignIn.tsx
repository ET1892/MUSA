import { useState } from "react";
import { Button, InputAdornment, Input, FormControl, InputLabel, IconButton, CircularProgress, Box} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Auth.css'
// import '../index.css'

import { Link, useNavigate } from "react-router-dom";
import { useAuth }from './AuthContext'
import { UserCredential } from "@firebase/auth";
const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const [passwordError, setPasswordError] = useState(false);
    const [emailVerified, setEmailVerified] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const { signIn } = useAuth();
    
    const HandleSignIn= async (e: any) => {
        e.preventDefault();
        try {
            const userCredential = await signIn(email, password);
        
            if (userCredential && userCredential.user) {
                const user = userCredential.user;
        
                if (user.emailVerified) {
                    // User is signed in and email is verified, navigate to the dashboard
                    setPasswordError(false);
                    setLoading(true);
                    setTimeout(() => {
                        navigate('/dashboard');
                      }, 2000);
                } else {
                    console.log('Email is not verified');
                    setLoading(false);
                    setEmailVerified(true);
                }
            } else {
                // Handle the case where the sign-in failed
                console.log('Sign in failed');
                setLoading(false);
                setPasswordError(true);
            }
        } catch (error: any) {
            // Handle other sign-in errors
            console.log(error.message);
            setPasswordError(true);
            setLoading(false);
        }
    };
    return (
        <div className="h-screen bg-cover bg-no-repeat bg-stars-background">

        {loading ? (
            <div className="h-screen flex flex-col items-center justify-center p-5"> 
            <Box sx={{ display: 'flex'}}>
                <CircularProgress />
            </Box>
            </div>
        ) : (
            <div className="h-screen flex flex-col items-center justify-center space-y-20" >
                <header className="flex flex-col justify-center items-center space-evenly space-y-20 text-white">
                    <h1 className="uppercase text-2xl font-bold" >MUSA</h1>
                    <h4 className="uppercase text-xl font-bold">Maynooth University Space Administration </h4>
                    <h1 className="uppercase text-2xl ">Sign In</h1>
                </header>
                <body className="flex flex-col justify-center items-center space-evenly space-y-8 m-10 text-white">
                        <div>
                            <FormControl sx={{color: 'white'}} variant="standard">
                                <InputLabel sx={{color: 'white'}} htmlFor="input-with-icon-adornment">
                                    Email
                                </InputLabel>
                                <Input
                                    sx={{
                                        width: '300px',
                                        height: '50px',
                                        color: 'white',
                                        ':before': { borderBottomColor: 'white' }

                                    }}
                                    id="input-with-icon-adornment"
                                    defaultValue=""
                                    error={passwordError}
                                    placeholder="JohnSmith@gmail.com"
                                    startAdornment={
                                        <InputAdornment  sx={{color: 'white'}}position="start">
                                        <AccountCircle />
                                        </InputAdornment>
                                    }
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </div>
                        <div>            
                            <FormControl variant="standard">
                                <InputLabel sx={{color: 'white'}} htmlFor="standard-adornment-password">Password</InputLabel>
                                <Input  
                                sx={{
                                    width: '300px',
                                    height: '50px',
                                    color: 'white',
                                    ':before': { borderBottomColor: 'white' }
                                }}
                                defaultValue=""
                                error={passwordError}
                                id="standard-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                    <InputAdornment sx={{color: 'white'}} position="end">
                                    <IconButton
                                        sx={{color: 'white'}}
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
                    {passwordError && (
                        <div className="flex items-center p-1 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg className="flex-shrink-0 inline w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                        <span className="font-medium"></span> Check email to verify account.
                        </div>
                    </div>
                    )}
                    {emailVerified && (
                        <div className="flex items-center p-1 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        <svg className="flex-shrink-0 inline w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                        </svg>
                        <span className="sr-only">Info</span>
                        <div>
                        <span className="font-medium"></span> Password or Email is incorrect.
                        </div>
                    </div>
                    )}
                    <div className="buttonTypes">
                        <div>
                            <Button variant="contained" size="large" onClick={HandleSignIn}>Sign in</Button>
                        </div>
                    </div>
                    <div>
                        <p >
                            Don't have an account with us? <Link to="/signUp" className="underline text-blue-800">Sign up</Link>
                        </p>
                    </div>
                </body>
            </div>
        )}
      </div>
    );

};
//rafce quick snippet for creating a functional component
export default SignIn;