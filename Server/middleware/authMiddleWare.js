const jwt = require("../utils/jwt");

function asureAuth(req, res, next) {
    if (!req.headers.authorization) {
        return res.status(403).send({ msg: "The request has no authentication header" });
    }

    const token = req.headers.authorization.replace("Token ", "");


    try {
        const payload = jwt.decoded(token); //trae la info del token y la decodifica

        const { exp } = payload;
        const currentData = new Date().getTime();

        if (exp <= currentData) {
            return res.status(400).send({ msg: "The token has expired" });
        }

        req.user = payload;
        //console.log("el middleware si dejó pasar")
        next();
    } catch (error) {
        res.status(400).send({ msg: "Invalid Token" });
        //console.log("el middleware no deja pasar")
    }
}

module.exports = {
    asureAuth,
};