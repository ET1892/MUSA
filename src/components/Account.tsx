import React from 'react'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom';

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
      Account
      <div>
        <strong>Email:</strong>{user?.email}
      </div>
      <div>
        <button onClick={handleLogout}>Logout</button>
      </div>
    </div>
  )
}

export default Account