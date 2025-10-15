const express = require('express')
const session = require('express-session')
require('dotenv').config();

const app=express()
const PORT = process.env.PORT

app.use(
    session({
      secret: process.env.SESSION_SECRET, 
      resave: false,
      saveUninitialized: false,
      cookie: { 
          secure: process.env.NODE_ENV === 'production' 
      }
    })
  );

  app.get("/setSession", (req, res) => {
    req.session.username = "johnDoe";
    res.send("Session data set for user: johnDoe");
  });
  
  app.get("/getSession", (req, res) => {
    const username = req.session.username;
    if (username) {
      res.send("Username retrieved from session: " + username);
    } else {
      res.send("No session data found. Please visit /setSession first.");
    }
  });
  
  app.get("/destroySession", (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error destroying session:", err);
        res.status(500).send("Error destroying session");
      } else {
        res.send("Session destroyed successfully");
      }
    });
  });

app.listen(PORT, () => {
    console.log(`🚀 Servidor funcionando en http://localhost:${PORT}/main`);
  });
