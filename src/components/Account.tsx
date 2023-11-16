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
      <main className="flex flex-col justify-center items-center space-y-10 h-screen  bg-cover bg-no-repeat bg-blackhole-background">
        <h1 className="uppercase text-xl font-bold text-white">My Account</h1>
        <div className="text-white">
          <strong>Email: </strong>{user?.email}
        </div>
        <div>
          <Button variant="contained" onClick={handleLogout}>Logout</Button>
        </div>
      </main>
    </div>
  );
}
export default Account