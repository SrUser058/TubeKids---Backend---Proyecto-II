const Playlist = require('../models/playlistModel.js');

const getPlaylistByFather = (req,res) => {
    //console.log(req.query.father);
    if(req.query && req.query.father){
        Playlist.find({father:req.query.father})
        .then(list => {
            if(list[0]){
                res.json(list).status(201);
            } else {
                res.json({list:'Void'}).status(201);
            };
        })
        .catch(error => {
            console.log(error);
            res.json({error:'Error searching the playlist'}).status(404);
        });
    }
};

const getPlaylist = (req, res) => {
    if (req.query && req.query.id) {
        /*Playlist.find()
            .then(playlistes => {
                for(x = 0; x <= playlistes.length; x++){
                    if(playlistes[x].name === req.query.name && playlistes[x].father === req.query.ref){
                        res.json(playlistes[x]);
                    };
                };
            })
            .catch(err => {
                res.status(422);
                console.log('Internal error while get the playlist',err )
                res.json({ "error": 422});
            });*/
        Playlist.findById(req.query.id)
            .then((playlist) => {
                res.json(playlist);
            })
            .catch(err => {
                res.status(404);
                console.log('Server error obtain the playlist', err)
                res.json({ error: "The playlist doesnt exist" })
            });
    } else {
        res.status(422);
        console.log('Error with the data in the request')
        res.json({ "error": 422 });
    };
};

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
                res.json({'location': `/api/playlist/?id=${data.id}`}).status(201);
            })
            .catch(error => {
                res.status(422);
                console.log('Server error while saving the playlist', error);
                res.json({ errorSend: 422 });
            });
    } else {
        res.status(422);
        console.log('Data error while saving the playlist');
        res.json({ errorSend: 422 });
    }
};

const patchPlaylist = async (req, res) => {
    //Buscar el usuario en la BD
    if (req.query && req.query.id) {
        await Playlist.findByIdAndUpdate(req.query.id, req.body)
            .then(answer => {
                res.json(answer);
            })
            .catch(err => {
                res.status(422);
                console.log('Error update the playlist', err);
                res.json({result: 422});
            });
        /*playlist.save((err) => {
            if(err){
                res.status(422);
                console.log('Server error while saving the playlist updates',err);
                res.json({error:422});
            }
            res.status(200);
            res.json(father);
        })*/
    } else {
        res.status(404);
        console.log('Internal error with the data');
        res.json({ error: 404 });
    };
};

const deletePlaylist = async (req, res) => {
    if (req.query && req.query.id) {
        await Playlist.findByIdAndDelete({ _id: req.query.id })
            .then(answer => {
                res.json(answer);
            })
            .catch(err => {
                console.log('Error on delete the playlist', err);
                res.json({ result: 422 }).status(422);
            });
    } else {
        res.status(422);
        console.log('No data to delete the playlist', err);
        res.json({ error: 422 });
    };
};

module.exports = { getPlaylist, postPlaylist, patchPlaylist, deletePlaylist, getPlaylistByFather};