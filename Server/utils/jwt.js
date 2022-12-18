const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../constants");

function createAccessToken(user) {
    const expToken = new Date();
    //expira dentro de 3 horas el token de acceso
    expToken.setHours(expToken.getHours() + 3);


    //Objetos que van dentro del token
    const payload = {
        token_type: "access",
        //Envio el id por medio del token
        user_id: user._id,
        //fecha creación del token
        iat: Date.now(),
        //fecha de expiración del token
        exp: expToken.getTime(),
    };

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function createRefreshToken(user) {
    const expToken = new Date();
    //expira dentro de un mes el token de refresh
    //Puedo poner menos tiempo, como horas, dias, semanas en caso de que sea requerido
    expToken.getMonth(expToken.getMonth() + 1);


    //Objetos que van dentro del token
    const payload = {
        token_type: "refresh",
        //Envio el id por medio del token
        user_id: user._id,
        //fecha creación del token
        iat: Date.now(),
        //fecha de expiración del token
        exp: expToken.getTime(),
    };

    return jwt.sign(payload, JWT_SECRET_KEY);
}

function decoded(token) {
    return jwt.decode(token, JWT_SECRET_KEY, true);
}

module.exports = {
    createAccessToken,
    createRefreshToken,
    decoded,
};