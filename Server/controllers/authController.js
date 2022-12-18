const bcryp = require("bcryptjs");
const User = require("../models/user");
const jwt = require("../utils/jwt");


function register(req, res) {
    const { firstname, lastname, email, password } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "El password es obligatorio" });

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
    });

    const salt = bcryp.genSaltSync(10);
    const hashPassword = bcryp.hashSync(password, salt);
    user.password = hashPassword;

    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({ msg: "Error al crear usuario" });
            console.error(error);
        } else {
            res.status(200).send(userStorage);
        }
    });
}

function login(req, res) {
    const { email, password } = req.body;

    if (!email) res.status(400).send({ msg: "El email es obligatorio" });
    if (!password) res.status(400).send({ msg: "La contraseña es obligatoria" });

    const emailLowerCase = email.toLowerCase();

    User.findOne({ email: emailLowerCase }, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            bcryp.compare(password, userStorage.password, (bcrypError, check) => {
                if (bcrypError) {
                    res.status(500).send({ msg: "Error del servidor" });
                } else if (!check) {
                    res.status(400).send({ msg: "Error, contraseña incorrecta" });
                } else if (!userStorage.active) {
                    res.status(401).send({ msg: "Usuario no autorizado o activo" });
                } else {
                    res.status(200).send({
                        access: jwt.createAccessToken(userStorage),
                        refresh: jwt.createRefreshToken(userStorage)
                    });
                }
            });
        }
    });
}

//Función para generar un nuevo  token de acceso en caso de expiración
function refreshAccessToken(req, res) {
    //Obtengo token
    const { token } = req.body;

    if (!token) res.status(400).send({ msg: "Token requerido" });

    //Saco el id del token
    const { user_id } = jwt.decoded(token);

    //busco por id el usuario
    User.findOne({ _id: user_id }, (error, userStorage) => {
        if (error) {
            res.status(500).send({ msg: "Error del servidor" });
        } else {
            res.status(200).send({
                //Se genera el nuevo token
                accessToken: jwt.createAccessToken(userStorage),
            });
        }
    });
}




module.exports = { register, login, refreshAccessToken }; 