import React, { useState, useEffect } from "react";
import ContactList from "./ContactList";
import AddContact from "./AddContact";
import { LogoutButton } from "./LogOutButton";
// import { LoginButton } from "./LoginButton";
import {SignUp} from "./SignUp";
import { useAuth0 } from "@auth0/auth0-react";
import { Route, Routes } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  fetchContacts,
  addContact,
  updateContact,
  deleteContact,
  singup,
} from "../api/contacts";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState(() => {
    const storedContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    return storedContacts || [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const storedContacts = async () => {
      const response = await fetchContacts();
      return response.data;
    };
    const getAllContacts = async () => {
      const allContacts = await storedContacts();
      if (allContacts) setContacts(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  const addContactHandler = async (contact) => {
    const request = {
      id: uuidv4(),
      ...contact,
    };

    const response = await addContact(request);
    const data = JSON.parse(response.config.data);
    const updatedContacts = [...contacts, data];
    setContacts(updatedContacts);
  };

  const updateContactHandler = async (id, updatedContact) => {
    try {
      
      const updatedContacts = contacts.map((contact) =>
        contact.id === id ? updatedContact : contact
      );
      console.log(updatedContacts);
      setContacts(updatedContacts);
      await updateContact(id, updatedContact);
    } catch (error) {
      console.log(error);
    }
  };
  const removeContactHandler = async (id) => {
    try {
      await deleteContact(id); // Delete from server
      const newContactList = contacts.filter((contact) => contact.id !== id);
      setContacts(newContactList); // Delete locally
    } catch (error) {
      console.error("Failed to delete contact:", error);
    }
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join("")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResults(newContactList);
    } else {
      setSearchResults(contacts);
    }
  };
  const singupHandler = async (formData) => {
    const request = {
      id: uuidv4(),
      ...formData,
    };

    const response = await singup(request);
    const data = JSON.parse(response.config.data);
    console.log(data);
  };

  
  const { isAuthenticated } = useAuth0();
  return (
    <div>
      <header>
        {isAuthenticated && (
          <>
            <p>You are logged in.</p>
            <Routes>
              <Route
                path="/contact-list"
                element={
                  <ContactList
                    searchResults={
                      searchTerm.length < 1 ? contacts : searchResults
                    }
                    getContactId={removeContactHandler}
                    term={searchTerm}
                    searchKeyWord={searchHandler}
                    currentPage={currentPage}
                    setPage={setCurrentPage}
                  />
                }
              />
              <Route
                path="/add"
                element={<AddContact addContactHandler={addContactHandler} />}
              />
              <Route
                path="/contact/:id"
                element={<ContactDetail contacts={contacts} />}
              />
              <Route
                path="/edit/:id"
                element={
                  <EditContact
                    updateContactHandler={updateContactHandler}
                    contacts={contacts}
                  />
                }
              />
            </Routes>

            <LogoutButton />
            {/* <button onClick={getData}>Click me</button> */}
          </>
        )}
        {!isAuthenticated && (
          <>
          <SignUp singupHandler={singupHandler}/>
          </>
        )}
      </header>
    </div>
  );
};

export default Home;