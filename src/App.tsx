import React from 'react';
import './App.css';
import { Routes, Route} from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Account from './components/Account';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './components/Dashboard';
import Community from './components/Community';
import { AuthContextProvider } from './components/AuthContext';
import PicOfDay from './components/PicOfDay';
import NearMissTst from './components/NearMissTst';

function App() {
  
  
  return (
    <div>
      <AuthContextProvider>
        <Routes>
              <Route path="/" element={<SignIn />} />
              <Route path="signUp" element={<SignUp />} />
              <Route path="account"
              element={
                <ProtectedRoute>
                  <Account />
                </ProtectedRoute>
              } />
              <Route path="dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="community"
              element={
                <ProtectedRoute>
                  <Community />
                </ProtectedRoute>
              } />
              <Route path="picOfDay"
              element={
                <ProtectedRoute>
                  <PicOfDay />
                </ProtectedRoute>
              } />
              <Route path="nearMiss"
              element={
                <ProtectedRoute>
                  <NearMissTst />
                </ProtectedRoute>
              } />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
