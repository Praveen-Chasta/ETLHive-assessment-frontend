import { useState,  useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { UserContext } from '../context/userContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';

import '../App.css';

function LoginPage() {
  
  const navigate = useNavigate()
  const[data, setData] = useState({
    username : '',
    password : ''
  })
  const { setUser } = useContext(UserContext);
  const [passwordType, setPasswordType] = useState('password');

  const togglePassword = () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  function onChange(value) {
    console.log("Captcha value:", value);
  }

  const onFormSubmition = async(e) => {
    e.preventDefault();
    
     
    const {username, password} = data

    try {
      const response = await axios.post('/login', {
        username, password
      });
      setUser(data);

      if (response.data.error) {
        setError(response.data.error);
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success("Login Successfully");
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.error || 'An unexpected error occurred.');
      console.log(error);
    }

  };

  return (
    <div className="login-form-container">
      <form onSubmit={onFormSubmition} className="login-form-element">
        <h1 className="login-heading">Login</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" className="login-input-field" placeholder="Username" onChange = {(e) => setData({...data, username : e.target.value})}/>
        <label htmlFor="password">Password</label>
        <div className="login-password-container">
          <input type={passwordType} id="password" className="login-input-field" placeholder="Password" onChange = {(e) => setData({...data, password : e.target.value})}/>
          <button type="button" className="login-toggle-password" onClick={togglePassword}>
            {passwordType === 'password' ? '👁️' : '🙈'}
          </button>
        </div>
        <div className="forgot-password-container">
            {/* <div className="remember-me">
                <input type="checkbox" id="checkbox" />
                <label htmlFor="checkbox">Remember me</label>
            </div> */}
            <div className="forgot-password">
                <Link to="/verify-email" className='resetLink'> Forgot Password</Link>
            </div>
        </div>

        {/* <div className="login-captcha-container">
        <ReCAPTCHA sitekey="6Lf9rCEqAAAAAEjsFY0g8VH3U7Dw2AWV2mKII5mT" onChange={onChange} />
        </div> */}
        <button type="submit" className="login-submit-button">Login</button>
        <p className="login-message">
          Create an Account <Link to="/signup" className="login-link">Sign up</Link>.
        </p>
      </form>
    </div>
  );
}

export default LoginPage;



// mongodb+srv://PraveenChasta:W4A9w4SqbdRZrqCL@cluster0.zg5y6pc.mongodb.net/