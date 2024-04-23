
const Childs = require('../models/childs.js');

//Obtener los datos del usuario principal de la BD
const getChilds = (req, res) => {
    if (req.query && req.query.id) {
        Childs.findById(req.query.id)
            .then((childs) => {
                res.status(200);
                res.json(childs);
            })
            .catch(err => {
                console.log('Server error obtain the user', err);
                res.status(422)
                res.json();
            });
    } else {
        console.log('Internal error with the user data');
        res.status(422);
        res.json();
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
                res.header({ 'location': `/api/kids/?id=${data.id}` });
                res.status(201);
                res.json(data);
            })
            .catch(error => {
                console.log('Server error while saving the kids account', error);
                res.status(422);
                res.json();
            });
    } else {
        console.log('Data error while saving the kids account');
        res.status(422);
        res.json();
    }
};

// Actualizar los datos de un usuario
const patchChilds = async (req, res) => {
    //Buscar el usuario en la BD
    if (req.query && req.query.id) {
        await Childs.findByIdAndUpdate(req.query.id, req.body)
            .then(answer => {
                res.status(200);
                res.json(answer);
            })
            .catch(err => {
                console.log('Error update the user', err);
                res.status(422);
                res.json(undefined);
            });
    } else {
        console.log('Internal error with the data');
        res.status(404);
        res.json();
    };
};

// Eliminar los datos de un usuario
const deleteChilds = async (req, res) => {
    if (req.query && req.query.id) {
        await Childs.findByIdAndDelete(req.query.id)
            .then(answer => {
                res.status(204);
                res.json(answer);
            })
            .catch(err => {
                console.log('Error on delete the user', err);
                res.status(422);
                res.json();
            });
    } else {
        console.log('No data to delete the user', err);
        res.status(422);
        res.json();
    };
};

module.exports = { postChilds, patchChilds, deleteChilds, getChilds };
