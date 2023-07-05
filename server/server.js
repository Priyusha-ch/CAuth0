const mongoose = require('mongoose');
const { auth, requiresAuth } = require('express-openid-connect');
const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const helmet = require("helmet");
const nocache = require("nocache");
const { messagesRouter } = require("./messages/messages.router");
const { errorHandler } = require("./middleware/error.middleware");
const { notFoundHandler } = require("./middleware/not-found.middleware");
const { validateAccessToken } = require('./middleware/auth0.middleware');

dotenv.config();

if (!(process.env.PORT && process.env.CLIENT_ORIGIN_URL)) {
    throw new Error(
      "Missing required environment variables. Check docs for more info."
    );
  }
  
  const PORT = parseInt(process.env.PORT, 10);
  const CLIENT_ORIGIN_URL = process.env.CLIENT_ORIGIN_URL;
  
  const app = express();
  const apiRouter = express.Router();
  
  app.use(express.json());
  app.set("json spaces", 2);


  app.use(
    cors({
      origin: CLIENT_ORIGIN_URL,
      methods: ["GET"],
      allowedHeaders: ["Authorization", "Content-Type"],
      maxAge: 86400,
    })
  );
  
  app.use("/api", apiRouter);
  apiRouter.use("/messages", messagesRouter);
  
  app.use(errorHandler);
  
  app.get('/api/data', validateAccessToken,(req,res)=>{
    console.log(req.auth.payload.sub);
    res.send("the data is here")
  })

  
mongoose.connect('mongodb://127.0.0.1:27017/contactdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const contactSchema = new mongoose.Schema({
      name: String,
      email: String,
      password: String,
    });
  
  const userSchema = new mongoose.Schema({
      username: String,
      email: String,
      password: String,
    });
  
  const Contact = mongoose.model('Contact', contactSchema);
  const User = mongoose.model('User', userSchema);



  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });