const Playlist = require('../models/playlistModel.js');

const postPlaylist = async (req, res) => {
    let playlist = new Playlist();

    //Pasar los datos del request al modelo
    playlist.name = req.body.name;
    playlist.father = req.body.father;
    playlist.videos = req.body.videos;


    // Validar que los datos no sean null
    if (playlist.name && playlist.father && playlist.videos) {
        await playlist.save()
            .then(data => {
                res.header({ 'location': `/api/playlist/?id=${data.id}` });
                res.json(playlist).status(201);
            })
            .catch(error => {
                console.log('Server error while saving the playlist', error);
                res.json().status(422);
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
                res.json(playlist).status(200);
            })
            .catch(err => {
                console.log('Server error obtain the playlist', err)
                res.json().status(422);
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
                res.json(answer).status(200);
            })
            .catch(err => {
                console.log('Error update the playlist', err);
                res.json().status(422);
            });
    } else {
        res;
        console.log('Internal error with the data');
        res.json().status(404);
    };
};

const deletePlaylist = async (req, res) => {
    if (req.query && req.query.id) {
        await Playlist.findByIdAndDelete(req.query.id)
            .then(answer => {
                res.json(answer).status(204);
            })
            .catch(err => {
                console.log('Error on delete the playlist', err);
                res.json().status(422);
            });
    } else {
        console.log('No data to delete the playlist', err);
        res.json().status(422);
    };
};

module.exports = {postPlaylist, patchPlaylist, deletePlaylist, getPlaylist};