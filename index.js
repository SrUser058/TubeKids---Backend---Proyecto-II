require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

//Database Conection
const db = mongoose.connect(process.env.dbString); // Variable de entorno
const theSecretKey = process.env.JWT_SECRET;
//
const app = express();
app.use(express.json());
app.use(cors({
    domain: 'http://127.0.0.1:5500',
    methods: "*"
}))

const {sendMessage} = require('./auth')

const {getFather, postFather, patchFather, deleteFather} = require('./controllers/fathers_controler');

const {getChilds, postChilds, patchChilds, deleteChilds} = require('./controllers/childs_controler');

const {getPlaylist, postPlaylist, patchPlaylist, deletePlaylist} = require('./controllers/playlists_controler');

/*app.get("/api/login/", getAllFather);
app.get("/api/register/", getEmail);
app.get("/api/childs/father/", getChildsByFather);
app.get("/api/playlist/father/", getPlaylistByFather);*/


// login with JWT
app.post("/api/session", function (req, res) {
  if (req.body._id && req.body.email && req.body.password) {

    //TODO: query the database to get the user info
    const token = jwt.sign({
      _id:req.body._id,
      email:req.body.email,
      password:req.body.password
    }, theSecretKey);

    res.status(201).json({
      token
    })
  } else {
    res.status(422);
    res.json({
      error: 'Invalid username or password'
    });
  }
});

// JWT Authentication middleware
app.use(function (req, res, next) {
    if (req.headers["authorization"]) {
      const authToken = req.headers['authorization'].split(' ')[1];
      try {
        jwt.verify(authToken, theSecretKey, (err, decodedToken) => {
          if (err || !decodedToken) {
            res.status(401);
            res.json({
              error: "Unauthorized"
            });
          }
          console.log('Welcome', decodedToken._id);
          next();
        });
      } catch (e) {
        res.status(401);
        res.send({
          error: "Unauthorized "
        });
      }
    } else {
      res.status(401);
      res.send({
        error: "Unauthorized "
      });
    }
  });
  
  
// Escuchando los puertos
app.get("/api/auth/", sendMessage);


app.get("/api/father/", getFather);
app.post("/api/father", postFather);
app.patch("/api/father/", patchFather);
app.delete("/api/father/", deleteFather);

app.get("/api/childs/", getChilds);
app.post("/api/childs", postChilds);
app.patch("/api/childs/", patchChilds);
app.delete("/api/childs/",deleteChilds);

app.get("/api/playlists/", getPlaylist);
app.post("/api/playlists", postPlaylist);
app.patch("/api/playlists/", patchPlaylist);
app.delete("/api/playlists/", deletePlaylist);



// Star the service in local network
app.listen(3001, () => console.log(`Service listening on port 3001!`))
