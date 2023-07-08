// const { auth, requiresAuth } = require('express-openid-connect');
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
// const helmet = require("helmet");
// const nocache = require("nocache");
// const { messagesRouter } = require("./messages/messages.router");
// const { errorHandler } = require("./middleware/error.middleware");
// const { notFoundHandler } = require("./middleware/not-found.middleware");
// const { validateAccessToken } = require('./middleware/auth0.middleware');

dotenv.config();

// if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
//     throw new Error(
//       "Missing required environment variables. Check docs for more info."
//     );
//   }
  
  const PORT = parseInt(process.env.PORT, 10);
//   const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
  
  const app = express();
  app.use(cors());
//   const apiRouter = express.Router();
  
  app.use(express.json());
//   app.set("json spaces", 2);


//   app.use(
//     cors({
//       origin: CLIENT_ORIGIN_URL,
//       methods: ["GET"],
//       allowedHeaders: ["Authorization", "Content-Type"],
//       maxAge: 86400,
//     })
//   );
  
  // app.use("/api", apiRouter);
  // apiRouter.use("/messages", messagesRouter);
  
  // app.use(errorHandler);
  
  // app.get('/api/data', validateAccessToken,(req,res)=>{
  //   console.log(req.auth.payload.sub);
  //   res.send("the data is here")
  // })
 
  let contactsCollection 
  mongoose
  .connect('mongodb://127.0.0.1:27017/contactdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const db = mongoose.connection;
    contactsCollection = db.collection('contacts');
  console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Failed to connect to the database:', error);
    process.exit(1);
  });
  
  app.get('/api/contacts', async (req, res) => {
    console.log(req);
    try {
      const contacts = await contactsCollection.find().toArray();
      res.json(contacts);
    } catch (error) {
      console.error('Failed to fetch contacts:', error);
      res.status(500).json({ error: 'Failed to fetch contacts' });
    }
  });

  app.post('/api/contacts', async (req, res) => {
    try {
      const contact = req.body;
      const result = await contactsCollection.insertOne(contact);
      res.status(201).json(result.insertedId);
    } catch (error) {
      console.error('Failed to add contact:', error);
      res.status(500).json({ error: 'Failed to add contact' });
    }
  });

  app.put('/api/contacts/:id', async (req, res) => {
    console.log("req",req.params);
   try {
     const { id } = req.params;
     console.log(id);
     const updatedContact = req.body;
     console.log(updatedContact);
     const result = await contactsCollection.updateOne({ id:id }, { $set: updatedContact });
     console.log('result',result);
     res.json(result.modifiedCount);
   } catch (error) {
     console.error('Failed to update contact:', error);
     res.status(500).json({ error: error.message });
   }
 });

 app.delete('/api/contacts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const result = await contactsCollection.deleteOne({ id:id});
    console.log('result', result);
    res.json(result.deletedCount);
  } catch (error) {
    console.error('Failed to delete contact:', error);
    res.status(500).json({ error: error.message });
  }
});
  
 

  

  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });



   // const contactSchema = new mongoose.Schema({
  //     name: String,
  //     email: String,
  //     password: String,
  //   });
  
  // const userSchema = new mongoose.Schema({
  //     username: String,
  //     email: String,
  //     password: String,
  //   });
  
  // const Contact = mongoose.model('Contact', contactSchema);
  // const User = mongoose.model('User', userSchema);