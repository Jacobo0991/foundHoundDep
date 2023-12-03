const User = require('../models/User.model');
const { createToken, verifyToken } = require("../utils/jwt.tools");
const ROLES = require("../data/roles.constants.json");
const debug = require("debug")("app:auth")
const { sendEmailWithNodemailer } = require("../utils/email.tools");

const controller = {};

controller.register = async (req, res, next) => {
    try {

        //Obtener la información del usuario
        const { email, password, phone, name, dui } = req.body;
        const image  = req.file ? true : false;

        //Revisar si el usuario ya existe
        const user = await User.findOne({ $or: [{ email: email }, { dui: dui }, { phone: phone }] });
        if (user) {
            res.status(409).json({ error: "El usuario ya existe" });
        }

        //Si no, crear un nuevo usuario
        const newUser = new User({
            email: email,
            password: password,
            phone: phone,
            dui: dui,
            name: name,
            image: "./src/assets/img/usuario-de-perfil.png",
            roles: [ROLES.USER]
        });

        const savedUser = await newUser.save();

        if (!image) {
            return res.status(201).json({ message: "Usuario registrado" });
        }
        
        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            public_id: savedUser._id,
            upload_preset: "FoundHound",
            overwrite: true
        }, process.env.CLOUDS);
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const formData = new FormData();
        formData.append("file", dataURI);
        formData.append("upload_preset", "FoundHound");
        formData.append("cloud_name", "dlmtei8cc")
        formData.append("public_id", savedUser._id);
        formData.append("overwrite", true);
        formData.append("api_key", process.env.CLOUDK)
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);

        const dataRes = await axios.post(
            process.env.CLOUDU,
            formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
        }
        );
        imageUrl = dataRes.data.url;

        savedUser.image = imageUrl;
        const imgUser = await savedUser.save();

        if (!imgUser) {
            return res.status(201).json({ message: "Usuario registrado, pero ocurrió un error al guardar la imagen" });
        }

        return res.status(201).json({ message: "Usuario registrado" });
    } catch (error) {
        next(error)
    }
}

controller.login = async (req, res, next) => {
    try {
        //Obtener la info identificador, contrasenia y el rol
        const { identifier, password } = req.body;
        const { role } = req.params;
        let user;

        //Verificar si el usuario existe basado en el rol
        user = await User.findOne({ $and: [{ $or: [{ email: identifier }] }, { $or: [{ roles: role }, { roles: "admin" }] }] });
        //Si no existe, retornar 404
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        //Verificar la contrasenia
        //Si no coincide, 401
        if (!user.comparePassword(password)) {
            return res.status(401).json({ error: "Contraseña incorrecta" });
        }

        //Si coindice, logear
        //Crear un token
        const token = await createToken(user._id);

        //Almacenar token
        let _tokens = [...user.tokens];
        const _verifyPromises = _tokens.map(async (_t) => {
            const status = await verifyToken(_t);

            return status ? _t : null;
        });
        _tokens = (await Promise.all(_verifyPromises)).filter(_t => _t).slice(0, 4);
        //Verificar la integridad de los token actuales max 5 sesiones por usuario

        _tokens = [token, ..._tokens];
        user.tokens = _tokens;
        await user.save();
        return res.status(200).json({ token })

    } catch (error) {
        next(error)
    }
}

controller.whoami = async (req, res, next) => {
    try {
        const { _id, email, roles, name, phone, dui, image } = req.user;
        return res.status(200).json({ _id, email, roles, name, phone, dui, image });
    } catch (error) {
        next(error)
    }
}

//Enviar código de recuperación de contraseña
controller.sendCode = async (req, res, next) => {
    try {
        const { identifier } = req.body;
        const { role } = req.params;

        //Verificar si el usuario existe basado en el rol
        const user = await User.findOne({ $and: [{ $or: [{ email: identifier }] }, { $or: [{ roles: role }, { roles: "admin" }] }] });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        const userMail = user.email;

        //Genero código, guardarlo
        let code = '';
        while (code.length < 5) {
            code += Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
        }
        code = code.substring(0, 5).toUpperCase();

        user.code = code;
        user.codeDate = new Date();
        _user = await user.save();

        if (!user) {
            return res.status(500).json({ error: "Error enviando el código" });
        }

        //Enviar código por correo
        const emailData = {
            from: "foundhound09@gmail.com",
            to: user.email,
            subject: `Recuperación de contraseña`,
            html: `
                    <p>Nos enteramos que tienes problemas con tu contaseña, para resetearla ingresa el siguiente código: ${code}</p>
                    <p>Este código vence en 5 minutos</p>
                    <br>
                    <p>Si no has solicitado un cambio de contraseña, ignora este correo<p>
                `,
        };

        const emailConfirmation = await sendEmailWithNodemailer(req, res, emailData);
        if (!emailConfirmation) {
            return res.status(500).json({ error: "Internal server error" })
        }

        return res.status(200).json({ message: "Código enviado" });

    } catch (error) {
        next(error)
    }
}

//Compara el código escrito por el usuario al que está ingresado en la base de datos
controller.compareCode = async (req, res, next) => {
    try {
        //Obtener la info identificador, contrasenia y el rol
        const { identifier, code, pass } = req.body;
        const { role } = req.params;

        //Verificar si el usuario existe basado en el rol
        let user;
        user = await User.findOne({ $and: [{ $or: [, { email: identifier }] }, { $or: [{ roles: role }, { roles: "admin" }] }] });
        //Si no existe, retornar 404
        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        //Verificar la validez del código
        //Si no coincide, 401
        if (!user.compareCode(code) || !checkCodeDate(new Date(), user.codeDate)) {
            return res.status(401).json({ error: "Código no válido" });
        }

        if (pass) {
            //Reemplazar el código para que no se pueda reutilizar
            let _code = '';
            while (_code.length < 5) {
                _code += Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(36);
            }
            _code = _code.substring(0, 5).toUpperCase();
            user.code = _code;
            user.password = pass;
            const _user = await user.save();

            if (!_user) {
                return res.status(500).json({ error: "Error actualizando la contraseña" });
            }

            return res.status(200).json({ message: "Contraseña actualizada correctamente"});
        }

        return res.status(200).json({ message: "Código correcto" });

    } catch (error) {
        next(error);
    }
}

//Verificar el tiempo de vencimiento del código de recuperación
function checkCodeDate(date1, date2) {
    // Obtener la diferencia entre las dos fechas
    const diff = Math.abs(date1 - date2);
    // Define el límite de tiempo en milisegundos (5 minutos)
    const limit = 5 * 60 * 1000;

    // verificar que la diferencia sea menor a los 5 minutos
    return diff <= limit;
}

// controller.contactForm = (req, res, next) => {
//   console.log(req.body);
//   const { email } = req.body;

//   const emailData = {
//     from: "foundhound09@gmail.com", // MAKE SURE THIS EMAIL IS YOUR GMAIL FOR WHICH YOU GENERATED APP PASSWORD
//     to: email, // WHO SHOULD BE RECEIVING THIS EMAIL? IT SHOULD BE YOUR GMAIL
//     subject: "Prueba 02 de correo",
//     html: `
//         <h4>Email received from contact form:</h4>
//         <p>Esta es una prueba de verdad</p>
//     `,
//   };

//   sendEmailWithNodemailer(req, res, emailData);
// };

module.exports = controller;