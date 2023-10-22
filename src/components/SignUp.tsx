import React from 'react'
import { Link, useNavigate} from 'react-router-dom'
import { useState } from 'react'
import { FormControl, InputLabel, Input, InputAdornment } from '@mui/material'
import { AccountCircle } from '@mui/icons-material'
import { useAuth }from './AuthContext'
import { auth } from '../config/firebase'
// import { createUserWithEmailAndPassword } from 'firebase/auth'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { Button } from '@mui/material'
import './Auth.css'
const SignUp = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [passwordError, setPasswordError] = useState(false);
  const navigate = useNavigate()

  const { createUser } = useAuth()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setError('')
    try {
      await createUser(email, password)
      navigate('/account')
    } catch (e: any) {
      setError(e.message)
      console.log(e)
    }
  }
  return (
    <div>
      <header>
        <h1>Sign up to MUSA</h1>
      </header>
      <body>
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
        <div className="buttonTypes">
          <div>
            <Button variant="contained"onClick={handleSubmit}>Register</Button>
          </div>
        </div>
        <p>
          Already have an account with us? <Link to="/">Sign in</Link>
        </p>
      </body>
    </div>
  )
}

export default SignUp