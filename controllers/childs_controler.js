
const Childs = require('../models/childs.js');

//Obtener los datos del usuario principal de la BD
const getChilds = (req, res) => {
    if (req.query && req.query.id) {
        Childs.findById(req.query.id)
            .then((childs) => {
                res.json(childs).status(200);
            })
            .catch(err => {
                console.log('Server error obtain the user', err);
                res.json().status(422);
            });
    } else {
        console.log('Internal error with the user data');
        res.json().status(422);
    };
};

// Insertar un nuevo usuario principal en la BD
const postChilds = async (req, res) => {
    let childs = new Childs();

    //Pasar los datos del request al modelo
    childs.name = req.body.name;
    childs.age = req.body.age;
    childs.pin = req.body.pin;
    childs.father = req.body.father;
    childs.avatar = req.body.avatar;

    // Validar que los datos no sean null
    if (childs.name && childs.age && childs.pin && childs.pin.toString().length == 6 && childs.father) {
        await childs.save()
            .then(data => {
                //res.header({ 'location': `/api/kids/?id=${data.id}` });
                res.json({ 'location': `/api/kids/?id=${data.id}` }).status(201);
            })
            .catch(error => {
                console.log('Server error while saving the kids account', error);
                res.json().status(422);
            });
    } else {
        console.log('Data error while saving the kids account');
        res.json().status(422);
    }
};

// Actualizar los datos de un usuario
const patchChilds = async (req, res) => {
    //Buscar el usuario en la BD
    if (req.query && req.query.id) {
        await Childs.findByIdAndUpdate(req.query.id, req.body)
            .then(answer => {
                res.json(answer).status(200);
            })
            .catch(err => {
                console.log('Error update the user', err);
                res.json(undefined).status(422);
            });
    } else {
        console.log('Internal error with the data');
        res.json().status(404);
    };
};

// Eliminar los datos de un usuario
const deleteChilds = async (req, res) => {
    if (req.query && req.query.id) {
        await Childs.findByIdAndDelete(req.query.id)
            .then(answer => {
                res.json(answer).status(204);
            })
            .catch(err => {
                console.log('Error on delete the user', err);
                res.json().status(422);
            });
    } else {
        console.log('No data to delete the user', err);
        res.json().status(422);
    };
};

module.exports = {postChilds, patchChilds, deleteChilds, getChilds};
