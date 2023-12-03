const middlewares = {};
const { verifyToken } = require("../utils/jwt.tools");
const ROLES = require('../data/roles.constants.json');
const User = require("../models/User.model");
const PREFIX = "Bearer";

middlewares.authentication = async (req, res, next) => {
    try {

        //Verificar el método de autorización
        const { authorization } = req.headers;

        if (!authorization) {
            return res.status(401).json({ error: "Usuario no autenticado" })
        }

        //Verificar validez del token
        const [prefix, token] = authorization.split(" ");
        if (prefix !== PREFIX || !token) {
            return res.status(401).json({ error: "Usuario no autenticado" })
        }

        const payload = await verifyToken(token);

        if (!payload) {
            return res.status(401).json({ error: "Usuario no autenticado" })
        }

        const userID = payload.sub;

        //Verificar el usuario
        const user = await User.findById(userID);

        if (!user) {
            return res.status(401).json({ error: "Usuario no autenticado" })
        }

        //Comparar el token con los token registrados

        const isTokenValid = user.tokens.includes(token);
        if (!isTokenValid) {
            return res.status(401).json({ error: "Usuario no autenticado" })
        }

        //Verificar la peticion para aniadir la informacion del usuario
        req.user = user;
        req.token = token;

        next();
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Internal server error" })
    }
}

middlewares.authorization = (requiredRole = ROLES.ADMIN) => {
    return async (req, res, next) => {
        //Antes de este middleware debe de haber pasado por la autenticacion
        try {
            const { roles } = req.user;
            //Verificar si el rol requerido esta en la coleccion
            const isAuth = roles.includes(requiredRole);
            const isAdmin = roles.includes(ROLES.ADMIN);
            
            //Si no esta, devolver 403
            if (!isAuth && !isAdmin) {
                return res.status(403).json({ error: "Prohibido"});
            }
            
            next();

        } catch (error) {
            console.error(error)
            return res.status(500).json({ error: "Internal server error" })
        }
    }
}
module.exports = middlewares;