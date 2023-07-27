import React, { useState } from 'react';
import './Style.css';
import { LoginButton } from './LoginButton';
//import axios from 'axios';

export const SignUp = ({ singupHandler }) => {
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: ''
  });


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      singupHandler({ formData });
      setFormData({
        ...formData, email: '', firstName: '', lastName: '', password: ''
      });
      setMessage('User registered successfully');
      //const response = await axios.post('http://localhost:3006/register', formData);
      // console.log(response.data);
      // Optionally, you can handle success or redirect the user to a success page here.
    } catch (error) {
      console.error(error);
      // Optionally, you can display an error message to the user here.
    }
  };

  return (
    <div id="mybody">
      <div className="wrapper">
        <form onSubmit={handleSubmit}>
          <h2>Signup Page</h2>
          <div className="input-field">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <label>Enter your first name</label>
          </div>
          <div className="input-field">
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
            <label>Enter your last name</label>
          </div>
          <div className="input-field">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <label>Enter your Email</label>
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <label>Enter your Password:</label>
          </div>    
          <button type="submit">Sign Up</button>  
          <div>            
              <label id="lblMessage" name="lblMessage">{message}</label>            
          </div>        
          <div className="register">
            <p>Already have an account? {<LoginButton />}</p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;