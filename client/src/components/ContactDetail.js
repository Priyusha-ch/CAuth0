import React from "react";
import { useParams, Link } from "react-router-dom";
import user from "../images/user.jpg";




const ContactDetail = ({ contacts }) => {
  const { id } = useParams();
  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return <div>Contact not found</div>;
  }

  const { name, email } = contact;

  return (
    <div className="contact-detail-container">
      <div className="image-container">
        <img src={user} alt="user" className="user-image" />
      </div>
      <div className="contact-details">
        <div className="name">{name}</div>
        <div className="email">{email}</div>
      </div>
      <div className="center-div">
        <Link to="/contact-list">
          <button className="ui button blue">Back to Contact List</button>
        </Link>
      </div>
    </div>
  );
};

export default ContactDetail;
