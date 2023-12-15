import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { FormControl, InputLabel, Input, InputAdornment, CircularProgress, Box } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useAuth }from './AuthContext'
import { auth, signInWithGooglePopup } from '../config/firebase'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Button } from '@mui/material'
import './Auth.css'
import GoogleIcon from '@mui/icons-material/Google';

const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [passwordError, setPasswordError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()

  const { createUser } = useAuth()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      setLoading(true)
      setPasswordError(false)
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (e: any) {
      setPasswordError(true)
      setError(e.message)
      setLoading(false)
      console.log(e)
    }
  }
  const logGoogleUser = async () => {
    try {
        await signInWithGooglePopup();
        navigate('/dashboard');
    } catch (error: any) {
        console.log(error.message);
    }
}
  return (
    <div className="h-screen bg-cover bg-no-repeat bg-stars-background">
      {loading ? (
        <div className="h-screen flex flex-col items-center justify-center p-5"> 
          <h1>Sending Verification email</h1>
          <Box sx={{ display: 'flex'}}>
            <CircularProgress />
          </Box>
        </div>
      ) : (
      <div className="h-screen flex flex-col items-center justify-center space-y-20">
        <header className="flex flex-col justify-center items-center space-evenly space-y-20 text-white">
        <img src="../pictures/MUSA.png" className="h-40 rounded-full" alt="MUSA Logo" />
          <h4 className="uppercase text-xl font-bold">Maynooth University Space Administration </h4>
          <h1 className="uppercase text-2xl ">Sign Up</h1>
        </header>  
        <body className="flex flex-col justify-center items-center space-evenly space-y-8 m-10">
          <div>
            <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment" sx={{color: 'white'}}>
                    Email
                </InputLabel>
                <Input
                    sx={{
                        width: '300px',
                        height: '50px',
                        color: 'white',
                        ':before': { borderBottomColor: 'white' }
                    }}
                    error={emailError}
                    id="input-with-icon-adornment"
                    placeholder="JohnSmith@gmail.com"
                    startAdornment={
                        <InputAdornment position="start" sx={{color: 'white'}}>
                        <AccountCircle />
                        </InputAdornment>
                    }
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormControl>
          </div>
          <div>
            <FormControl  variant="standard">
                <InputLabel htmlFor="standard-adornment-password" sx={{color: 'white'}}>Password</InputLabel>
                <Input 
                sx={{
                  width: '300px',
                  height: '50px',
                  color: 'white',
                  ':before': { borderBottomColor: 'white' }
              }}
                error={passwordError}
                id="standard-adornment-password"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end" sx={{color: 'white'}}>
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
          {emailError && (
            <div className="flex items-center p-1 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
              <span className="font-medium"></span> Account already exists.
              </div>
          </div>
          )}
          {passwordError && (
            <div className="flex items-center p-1 mb-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
              <svg className="flex-shrink-0 inline w-6 h-6 mr-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
              </svg>
              <span className="sr-only">Info</span>
              <div>
              <span className="font-medium"></span> password needs to be at least length 6.
              </div>
          </div>
          )}
          <div>
            <div>
              <Button variant="contained" size="large" onClick={handleSubmit}>Register</Button>
            </div>
          </div>
          <div>
              <Button style={{backgroundColor: "black"}}variant="contained" size="large"  onClick={logGoogleUser}>
                  <GoogleIcon/> Sign in with Google
              </Button>
            </div>
          <p className="text-white">
            Already have an account with us? <Link to="/" className="underline text-blue-800">Sign in</Link>
          </p>
        </body>
      </div>
      )}

    </div>
  )
}

export default SignUp