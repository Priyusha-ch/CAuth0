import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";


const ContactCard = (props) => {
  const { id, name, email, password } = props.contact;
  return (
    <React.Fragment>
      <td>
        <Link to={{pathname:`/contact/${id}`}}> 
        <img className="avatar" src={user} alt="user" />
        </Link>
      </td>
      <td><Link to={{pathname:`/contact/${id}`}}> {name}</Link></td>
      <td><Link to={{pathname:`/contact/${id}`}}> {id}</Link></td>
      <td><Link to={{pathname:`/contact/${id}`}}> {email}</Link></td>
      <td><Link to={{pathname:`/contact/${id}`}}> {password}</Link></td>
     
      <td className="corner-icon">
        <Link to={{ pathname: `/edit/${id}`, state: { contact: props.contact } }}>
        <FontAwesomeIcon icon={faEdit} style={{ color: "blue" }} />
        </Link>
        <FontAwesomeIcon
          icon={faTrash}
          style={{ color: "red" }}
          onClick={() => props.clickHandler(id)}
        />
      </td>
    </React.Fragment>
  );
};

export default ContactCard;