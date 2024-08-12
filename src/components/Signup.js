import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import '../App.css';

function App() {
  const navigate = useNavigate()
  const [passwordType, setPasswordType] = useState();
  const[data, setData] = useState({
    username : '',
    email : '',
    password : ''
  })

  const togglePassword =  () => {
    setPasswordType(passwordType === 'password' ? 'text' : 'password');
  };

  const onSignupFormSubmition = async(e) => {
    e.preventDefault();
 
    const {username , email , password} = data

    try {
      const response = await axios.post('/signup', {
        username , email , password
      });

      if (response.data.error) {
        setError(response.data.error);
        toast.error(response.data.error);
      } else {
        setData({});
        toast.success("Signup Successfully");
        navigate('/login');
      }
    } catch (error) {
      toast.error(error.response.data?.error || 'An unexpected error occurred.');
      console.log(error);
    }
  };

  return (
    <div className="sign-up-form-container">
      <form onSubmit={onSignupFormSubmition} className="form-element">
        <h1 className="sign-up-heading">Signup</h1>
        <label htmlFor="username">Username</label>
        <input type="text" id="username" className="input-field" placeholder="Username" onChange = {(e) => setData({...data, username : e.target.value})}/>
        <label htmlFor="email">Email</label>
        <input type="email" id="email" className="input-field" placeholder="Email" onChange = {(e) => setData({...data, email : e.target.value})}/>
        <label htmlFor="password">Password</label>
        <div className="password-container">
          <input type={passwordType} id="password" className="input-field" placeholder="Password" onChange = {(e) => setData({...data, password : e.target.value})}/>
          <button type="button" className="toggle-password" onClick={togglePassword}>
            {passwordType === 'password' ? '👁️' : '🙈'}
          </button>
        </div>
        <button type="submit" className="submit-button">Sign Up</button>
        <p className="login-message">
          Already have an account? <Link to="/login" className="login-link">Login here</Link>.
        </p>
      </form>
    </div>
  );
}

export default App;
