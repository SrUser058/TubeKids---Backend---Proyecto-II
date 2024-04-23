const Playlist = require('../models/playlistModel.js');

const postPlaylist = async (req, res) => {
    let playlist = new Playlist();

    //Pasar los datos del request al modelo
    playlist.name = req.body.name;
    playlist.father = req.body.father;
    playlist.linked = req.body.linked;
    playlist.videos = req.body.videos;

    //console.log(playlist);
    // Validar que los datos no sean null
    if (playlist.name && playlist.father && playlist.videos && playlist.linked) {
        await playlist.save()
            .then(data => {
                res.header({ 'location': `/api/playlist/?id=${data.id}` });
                res.status(201);
                res.json(playlist);//.status(201);
            })
            .catch(error => {
                console.log('Server error while saving the playlist', error);
                res.status(422);
                res.json();
            });
    } else {
        console.log('Data error while saving the playlist');
        res.json().status(422);
    }
};

const getPlaylist = (req, res) => {
    if (req.query && req.query.id) {
        Playlist.findById(req.query.id)
            .then((playlist) => {
                res.status(200);
                res.json(playlist);
            })
            .catch(err => {
                console.log('Server error obtain the playlist', err)
                res.status(422);
                res.json();
            });
    } else {
        console.log('Error with the data in the request')
        res.json().status(422);
    };
};

const patchPlaylist = async (req, res) => {
    if (req.query && req.query.id) {
        await Playlist.findByIdAndUpdate(req.query.id, req.body)
            .then(answer => {
                res.status(200);
                res.json(answer);
            })
            .catch(err => {
                console.log('Error update the playlist', err);
                res.json().status(422);
            });
    } else {
        res;
        console.log('Internal error with the data');
        res.status(404);
        res.json();
    };
};

const deletePlaylist = async (req, res) => {
    if (req.query && req.query.id) {
        await Playlist.findByIdAndDelete(req.query.id)
            .then(answer => {
                res.status(204);
                res.json(answer);
            })
            .catch(err => {
                console.log('Error on delete the playlist', err);
                res.status(422);
                res.json();
            });
    } else {
        console.log('No data to delete the playlist', err);
        res.status(422);
        res.json();
    };
};

module.exports = {postPlaylist, patchPlaylist, deletePlaylist, getPlaylist};