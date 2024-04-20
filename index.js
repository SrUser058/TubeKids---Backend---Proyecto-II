require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

//Database Conection
const db = mongoose.connect(process.env.dbString); // Variable de entorno

//
const app = express();
app.use(express.json());
app.use(cors({
    domain: 'http://127.0.0.1:5500',
    methods: "*"
}))

const {getFather, postFather, patchFather, deleteFather} = require('./controllers/fathers_controler');

const {getChilds, postChilds, patchChilds, deleteChilds} = require('./controllers/childs_controler');

const {getPlaylist, postPlaylist, patchPlaylist, deletePlaylist} = require('./controllers/playlists_controler');

/*app.get("/api/login/", getAllFather);
app.get("/api/register/", getEmail);
app.get("/api/childs/father/", getChildsByFather);
app.get("/api/playlist/father/", getPlaylistByFather);*/


// Escuchando los puertos
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
