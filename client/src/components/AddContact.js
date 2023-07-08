import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const AddContact = ({addContactHandler}) => {
    
    const navigate= useNavigate("");
    const [name, setName]= useState("");
    const [email, setEmail] =useState("");
    const [password, setPassword]=useState("");
    const add = async(e) => {
      e.preventDefault();
      if(name === "" || email === "" || password === ""){
        alert("All fields are mandatory");
        return;
      }
        addContactHandler({name, email, password})
        setName("");
        setEmail("");
        setPassword("");
        navigate("/contact-list");
      }
    return (
        <div>
          <div>
            <h1 className="headingStyle">Add Contact</h1>
            <form className="contactForm" onSubmit={add}>
              <label>Name</label>
              <input type="text" name= "name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value) }></input>
           
         
          
              <label>Email</label>
              <input type="text" name= "email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
          
         
         
              <label>Password</label>
              <input type="text" name= "password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
            
         
              <button type = "submit">Add</button>
            </form>
          </div>
        </div>  
    );
};
    
export default AddContact;