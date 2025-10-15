const express = require('express')
const session = require('express-session')
require('dotenv').config();


const app=express()
const PORT = process.env.PORT|| 3000;
app.use(express.json());
  
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
app.post('/login',(req,res)=>{
    const {usuario, password}=req.body
    if(usuario=='admin'&& password ==='1234'){
        res.send('Inicio de sesion correcto')
    }else{
        res.status(401).send('Credenciales incorrectas')
    }
})

app.get('/cerrar',(req, res)=>{
    req.session.destroy(err=>{
        if(err)return res.status(500).send('Error al cerrar sesion')
            res.send('sesion cerrada correctamente')
    })
})
app.listen(PORT, () => {
    console.log(` Servidor funcionando en http://localhost:${PORT}/main`);
  });
