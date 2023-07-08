import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { fetchContacts } from "../api/contacts";

const EditContact = ({ updateContactHandler }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const fetchContact = async () => {
      try {
        // const contact = await updateContact(id);
        const response = await fetchContacts();
        const contact = response.data.find((obj) => obj.id === id);

        console.log("Contact data: ", contact); // console log here
        const { name, email, password } = contact;
        setName(name);
        setEmail(email);
        setPassword(password);
      } catch (error) {
        console.log(error);
      }
    };

    fetchContact();
  }, [id]);

  const update = async (e) => {
    e.preventDefault();
    if (name === "" || email === ""  || password === "") {
      alert("All the fields are mandatory!");
      return;
    }

    try {
      await updateContactHandler( id, { name, email, password });
      navigate("/contact-list");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
    <div>
      <h1 className="headingStyle">Edit Contact</h1>
      <form className="contactForm" onSubmit={update}>
        <label>Name</label>
        <input type="text" name= "name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value) }></input>
     
   
    
        <label>Email</label>
        <input type="text" name= "email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
    
   
   
        <label>Password</label>
        <input type="text" name= "password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
      
   
        <button type = "submit">Update</button>
      </form>
    </div>
  </div>  
  );
};

export default EditContact;
