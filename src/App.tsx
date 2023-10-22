import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { Auth } from './components/Auth';
import { Routes, Route} from 'react-router-dom';
import { Home } from './components/Home';

import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';
//use navigation react - for page nav 
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from './config/firebase';
import { AuthContextProvider } from './components/AuthContext';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div>
      <AuthContextProvider>
        <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="home" element={<Home />} />
              <Route path="account" 
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
