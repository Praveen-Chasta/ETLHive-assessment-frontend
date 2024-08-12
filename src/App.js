import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ResetPassword from './components/ResetPassword';
import EmailVerify from './components/EmailVerify';
import {UserContextProvider} from './context/userContext';



axios.defaults.baseURL = 'https://etlhive-assessment-backend-2.onrender.com';
axios.defaults.withCredentials = true;

function App() {
   


  return (
    <UserContextProvider>
        <Navbar />
        <Toaster position = 'top-center' toastOptions={{duration : 2000}}/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/verify-email" element={<EmailVerify/>}/>
          <Route path="/reset-password" element={<ResetPassword/>}/>
        </Routes>
    </UserContextProvider>
  );
}

export default App;
