import React, { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import KendoReactGridView from "./KendoReactGridView";
import TableGridView from "./TableGridView";


const ContactList = (props) => {
    const inputEl = useRef("");
  const [gridView, setGridView] = useState(false); // State to toggle between grid view types

  const contactsPerPage = 10;

  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };

  const indexOfLastContact = props.currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = props.searchResults.slice(indexOfFirstContact, indexOfLastContact);

  const paginate = (pageNumber) => {
    props.setPage(pageNumber);
  };

  const getSearchTerm = () => {
    props.searchKeyWord(inputEl.current.value);
  };

  const toggleGridView = () => {
    setGridView(!gridView);
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(props.searchResults.length / contactsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="main">
      <div className="contact-list">
        <h2 className="h2">
          Contact List
          <Link to="/add">
            <button className="buttonStyle">Add Contact</button>
          </Link>
        </h2>
      </div>
      <div>
        <div className="search-input">
          <input  ref={inputEl} type="text" placeholder="Search Contacts" className="search-bar" value={props.term}
              onChange={getSearchTerm}/>
          <FontAwesomeIcon icon={faSearch} className="fa-search" />
        </div>
      </div>
      <div style={{marginTop:"10px", marginBottom:"20px"}}>
        <label>
          View:
          <select value={gridView ? "kendo" : "normal"} onChange={toggleGridView}>
            <option value="normal">Normal Grid View</option>
            <option value="kendo">KendoReact Grid View</option>
          </select>
        </label>
      </div>
      {gridView ? (
        <KendoReactGridView currentContacts={currentContacts}  deleteContactHandler={deleteContactHandler}  />
      ) : (
        <TableGridView currentContacts={currentContacts} deleteContactHandler={deleteContactHandler} />
      )}
      <div className="pagination" style={{ marginTop: "20px" }}>
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => paginate(number)}>
            {number}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ContactList;
