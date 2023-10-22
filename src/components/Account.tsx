import React from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import FlowNavBar from './FlowNavBar';
const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (e: any) {
      console.log(e.message);
    }
  }
  return (
    <div>
      <header>
        <FlowNavBar />
      </header>
      <body  className="flex flex-col justify-center items-center space-evenly space-y-20">
        <h1>Account</h1>
        <div>
          <strong>Email:</strong>{user?.email}
        </div>
        <div>
              <Button variant="contained"onClick={handleLogout}>Logout</Button>
        </div>
      </body>
    </div>
  )
}

export default Account