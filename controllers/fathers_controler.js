

const Father = require('../models/father');

// Insertar un nuevo usuario principal en la BD
const postFather = async (req, res) => {
    let father = new Father();

    //Pasar los datos del request al modelo
    father.name = req.body.name;
    father.lastname = req.body.lastname;
    father.email = req.body.email;
    father.age = req.body.age;
    father.password = req.body.password;
    father.pin = req.body.pin;
    father.country = req.body.country;
    father.birthdate = req.body.birthdate;
    father.avatar = req.body.avatar;

    console.log(req.body);
    // Validar que los datos no sean null
    if (father.name && father.lastname && father.email && father.password && father.age && father.pin && father.pin.toString().length == 6 && father.country && father.birthdate && father.avatar) {
        await father.save()
            .then(data => {
                //res.status(201);
                res.header({ 'location': `/api/father/?id=${data.id}`});
                res.json({location:`/api/father/?id=${data.id}`}).status(201);
            })
            .catch(error => {
                res.status(422);
                console.log('Server error while saving the new account', error);
                res.json({ errorSend: 422 });
            });
    } else {
        res.status(422);
        console.log('Data error while saving the new account');
        res.json({ errorSend: 422 });
    }
};

const getAllFather = (req, res) => {
    if (req.query.email && req.query.password) {
        Father.find({'email': req.query.email,'password' : req.query.password})
            .then(fathers => {
                //console.log(fathers[0].email,fathers[0].password);
                //console.log(req.query.email,req.query.password);
                if(fathers[0].email == req.query.email && fathers[0].password == req.query.password){
                    //console.log(1);
                    res.json({ verification: true, id: fathers[0].id }).status(201);
                }else{
                    //console.log(2);
                    res.json({ verification: false }).status(402);
                };
            })
            .catch(err => {
                res.status(404);
                console.log('Internal error while search the data', err);
                res.json({ error: 'Intentelo de nuevo mas tarde' });
            })
            /*.finally((verification)=>{
                res.json({verification:false});
            })*/
    } else {
        res.status(404);
        console.log('Imposible encontrar el usuario');
        res.json({ error: 404 });
    }
};

const getEmail = (req, res) => {
    if(req.query.email){
        Father.find({'email': req.query.email})
        .then(fathers => {
            if(!fathers[0]){
                res.json({'verification':true}).status(201);
            } else {
                res.json({'verification':false}).status(401);
            }
        }).catch(err => {
            res.json({error:'Imposible encontrar el correo en la bd'}).status(401);
            console.log(err);
        })
    } else {
        res.json({error:'Error en los datos enviados'}).status(401);
    };
};

// Obtener los datos del usuario principal de la BD
const getFather = (req, res) => {
    if (req.query.id) {
        Father.findById(req.query.id)
            .then((father) => {
                res.json(father);
            })
            .catch(err => {
                res.status(404);
                console.log('Server error obtain the user', err)
                res.json({ error: "The user doesnt exist" })
            });
    } else {
        res.status(404);
        console.log('Internal error with the user data');
        res.json({ error: 404 })
    };
}

// Actualizar los datos de un usuario
const patchFather = async (req, res) => {
    //Buscar el usuario en la BD
    if (req.query.id) {
        await Father.findByIdAndUpdate(req.query.id, req.body)
            .then(answer => {
                res.json(answer).status(201);
            })
            .catch(err => {
                console.log('Error update the user');
                res.json(undefined).status(422);
            });
    } else {
        res.status(404);
        console.log('Internal error with the data');
        res.json({ error: 404 });
    };
};

// Eliminar los datos de un usuario
const deleteFather = async (req, res) => {
    if (req.query.id) {
        await Father.findByIdAndDelete({ _id: req.query.id })
            .then(answer => {
                res.json(answer);
            })
            .catch(err => {
                res.status(422);
                console.log('Error on delete the account', err);
                res.json({ error: 422 });
            });
    } else {
        res.status(422);
        console.log('No data to delete the account', err);
        res.json({ error: 422 });
    };
};

module.exports = { getFather, postFather, patchFather, deleteFather, getAllFather, getEmail};