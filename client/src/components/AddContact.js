import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddContact = ({ addContactHandler }) => {
  const navigate = useNavigate("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [isPasswordValid, setIsPasswordValid] = useState(false);

  const add = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrors(["All fields are mandatory"]);
      return;
    }
    if (!isValidEmail(email)) {
      setErrors(["Please enter a valid email address"]);
      return;
    }
    if (!isPasswordValid) {
      setErrors([
        "Password should be at least 8 characters long",
        "Password should contain at least one Uppercase letter",
        "Password should contain at least one number",
        "Password should contain at least one special character"
      ]);
      return;
    }

    addContactHandler({ name, email, password });
    setName("");
    setEmail("");
    setPassword("");
    setErrors([]);
    setIsPasswordValid(false);
    navigate("/contact-list");
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };
  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setIsPasswordValid(validatePassword(newPassword));
  };

  return (
    <div>
      <div>
        <h1 className="headingStyle">Add Contact</h1>
        <form className="contactForm" onSubmit={add}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Email</label>
          <input
            type="text"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />

          {errors.length > 0 && (
            <ul style={{color:"red"}}>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          )}

          <button type="submit">Add</button>
        </form>
      </div>
    </div>
  );
};

export default AddContact;
