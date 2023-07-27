import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from "../api/contacts";   



  const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate= useNavigate("");

  
  function validate() {
    let result = true;
    if (email === '' || email === null) {
      result = false;
      alert('Please enter an email');
    }
    if (password === '' || password === null) {
      result = false;
      alert('Please enter a password');
    }
    return result;
  }

  
  const handleLogin = async (e) => {
    e.preventDefault();
      if (!validate()) {
          return;
        }
      
        try {
          const response = await loginUser(email, password);
          const { message, token } = response.data;
          alert(message);
          if (message === 'Login successful') {
            localStorage.setItem('token', token);
           
          } else {
            setError('Invalid email or password');
          }
          navigate('/contact-list');
        } catch (error) {
          setError('Failed to perform login');
          console.error(error);
        }
      
    };
      
  

   

  return (
    <div> 
      <div>
        <form className="contactForm" onSubmit={handleLogin}>
          <label>Email</label>
          <input type="text" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Password</label>
          <input type="password" name="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

          {error && <p className="error" style={{color:"red"}}>{error}</p>}
          <button>Log In</button>
          <div>
            <p>Don't have an account?
              <Link to="/sign_up" style={{ color: "blue" }}>Sign Up</Link>
            </p>
          </div>
          <div>
            <Link to="/forgot-password">Forgot Password</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
