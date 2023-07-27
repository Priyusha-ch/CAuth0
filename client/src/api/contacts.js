// api/contacts.js

// const BASE_URL = "http://localhost:3006/api/contacts";



// // Function to fetch contacts
// export const fetchContacts = async () => {
//   try {
//     const response = await fetch(BASE_URL);
//     if (!response.ok) {
//       throw new Error("Failed to fetch contacts");
//     }
//     const contacts = await response.json();
//     return contacts;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// // Function to add a contact
// export const addContact = async (contact) => {
//   try {
//     const response = await fetch(BASE_URL, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(contact),
//     });
//     if (!response.ok) {
//       throw new Error("Failed to add contact");
//     }
//     const insertedId = await response.json();
//     return insertedId;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };

// export const addContact = async (contact) => {
//   try {
//     const response = await api.post("/api/contacts", contact);
//     if (response.status !== 201) {
//       throw new Error("Failed to add contact");
//     }
//     const insertedId = response.data;
//     return insertedId;
//   } catch (error) {
//     throw new Error(error.message);
//   }
// };


import axios from "axios";
const api = axios.create({
    baseURL: 'http://localhost:3006', 
  });


export const fetchContacts = () => api.get('/api/contacts');
export const addContact = (contact) => api.post('/api/contacts', contact);
export const updateContact = (id, contact) => api.put(`/api/contacts/${id}`, contact);
export const deleteContact = (id) => api.delete(`/api/contacts/${id}`);
// export const signUpUser = (username, email, password) => api.post('/api/signup', { username, email, password });
export const loginUser = (email, password) => api.post('/api/login', { email, password });
export const singup = (formData) => api.post('/api/register', formData)


// export const updateContact = async (id, contact) => {
//   try {
//     const response = await api.put(`/api/contacts/${id}`, contact);
//     // Handle successful response
//     console.log('Contact updated successfully:', response.data);
//     return response.data;
//   } catch (error) {
//     // Handle error
//     console.error('Error updating contact:', error);
//     throw error; // Re-throw the error to propagate it to the caller
//   }
// };

// export const deleteContact = (id,contact) => api.delete(`/api/contacts/${id}`,contact);








export default api;