

const Father = require('../models/father');
const {sendEmail} = require('../emails')
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
                sendEmail(father);
                res.status(201);
                res.header({ 'location': `/api/father/?id=${data.id}`});
                res.json(father);
            })
            .catch(error => {
                res.status(422);
                console.log('Server error while saving the new account', error);
                res.json();
            });
    } else {
        console.log('Data error while saving the new account');
        res.status(422);
        res.json();
    }
};

// Obtener los datos del usuario principal de la BD
const getFather = (req, res) => {
    if (req.query.id) {
        Father.findById(req.query.id)
            .then((father) => {
                res.status(200);
                res.json(father);
            })
            .catch(err => {
                console.log('Server error obtain the user', err)
                res.status(404)
                res.json();
            });
    } else {
        console.log('Internal error with the user data');
        res.status(404);
        res.json();
    };
}

// Actualizar los datos de un usuario
const patchFather = async (req, res) => {
    //Buscar el usuario en la BD
    if (req.query.id) {
        await Father.findByIdAndUpdate(req.query.id, req.body)
            .then(answer => {
                res.status(200);
                res.json(answer);
            })
            .catch(err => {
                console.log('Error update the user');
                res.status(422);
                res.json();
            });
    } else {
        console.log('Internal error with the data');
        res.status(404);
        res.json();
    };
};

// Eliminar los datos de un usuario
const deleteFather = async (req, res) => {
    if (req.query.id) {
        await Father.findByIdAndDelete(req.query.id)
            .then(answer => {
                res.status(204);
                res.json(answer);
            })
            .catch(err => {
                console.log('Error on delete the account', err);
                res.status(422)
                res.json();
            });
    } else {
        console.log('No data to delete the account', err);
        res.status(422);
        res.json();
    };
};

module.exports = { getFather, postFather, patchFather, deleteFather};