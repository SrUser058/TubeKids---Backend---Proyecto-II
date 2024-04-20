

const Father = require('../models/father');

// Insertar un nuevo usuario principal en la BD
const postFather = async (req, res) => {
    
    //Pasar los datos del request al modelo
    let father = new Father(req.body);

    
    /*father.name = req.body.name;
    father.lastname = req.body.lastname;
    father.email = req.body.email;
    father.age = req.body.age;
    father.password = req.body.password;
    father.pin = req.body.pin;
    father.country = req.body.country;
    father.birthdate = req.body.birthdate;
    father.avatar = req.body.avatar;*/

    console.log(req.body);
    // Validar que los datos no sean null
    if (father.name && father.lastname && father.email && father.password && father.age && father.pin && father.pin.toString().length == 6 && father.country && father.birthdate && father.avatar && father.phone && father.status == false) {
        await father.save()
            .then(data => {
                //res.status(201);
                res.header({ 'location': `/api/father/?id=${data.id}`});
                res.json(father).status(201);
            })
            .catch(error => {
                res.status(422);
                console.log('Server error while saving the new account', error);
                res.json();
            });
    } else {
        console.log('Data error while saving the new account');
        res.json().status(422);
    }
};

// Obtener los datos del usuario principal de la BD
const getFather = (req, res) => {
    if (req.query.id) {
        Father.findById(req.query.id)
            .then((father) => {
                res.json(father).status(200);
            })
            .catch(err => {
                console.log('Server error obtain the user', err)
                res.json().status(404);
            });
    } else {
        console.log('Internal error with the user data');
        res.json().status(404);
    };
}

// Actualizar los datos de un usuario
const patchFather = async (req, res) => {
    //Buscar el usuario en la BD
    if (req.query.id) {
        await Father.findByIdAndUpdate(req.query.id, req.body)
            .then(answer => {
                res.json(answer).status(200);
            })
            .catch(err => {
                console.log('Error update the user');
                res.json(undefined).status(422);
            });
    } else {
        console.log('Internal error with the data');
        res.json().status(404);
    };
};

// Eliminar los datos de un usuario
const deleteFather = async (req, res) => {
    if (req.query.id) {
        await Father.findByIdAndDelete(req.query.id)
            .then(answer => {
                res.json(answer).status(204);
            })
            .catch(err => {
                console.log('Error on delete the account', err);
                res.json().status(422);
            });
    } else {
        console.log('No data to delete the account', err);
        res.json().status(422);
    };
};

module.exports = { getFather, postFather, patchFather, deleteFather};