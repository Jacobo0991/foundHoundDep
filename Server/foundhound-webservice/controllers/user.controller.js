const User = require("../models/User.model");
const cloudinary = require("cloudinary").v2;
const axios = require("axios");
const multer = require('multer');
const debug = require("debug")("app:user")
require('dotenv').config();
const controller = {};

//Calificar a los usuarios
controller.reviewUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { rating, content } = req.body;
        const { _id } = req.user;

        let user = await User.findOne({ _id: id, roles: "user" }).populate("reviews.user", "name email");

        if (!user) {
            res.status(404).json({ error: "Usuario no encontrado" })
        }

        let _reviews = user.reviews;

        const prevIndex = _reviews.findIndex(r => r.user.equals(_id));

        if (prevIndex >= 0) {
            //El comentario ya existe
            const _review = _reviews[prevIndex];
            _review.rating = rating;
            _review.content = content;
            _review.timestamp = new Date();

            _reviews[prevIndex] = _review;
        } else {
            //El comentario no existe
            _reviews = [..._reviews, { user: _id, rating: rating, content: content, timestamp: new Date() }];

        }
        //Guardamos el post - commit
        user["reviews"] = _reviews;
        const { _idUser, name, email, reviews } = await (await user.save()).populate("reviews.user", "name email");

        //Retornamos el post actualizado
        return res.status(200).json({ _idUser, name, email, reviews });

    } catch (error) {
        next(error);
    }
}

//Ver usuario
controller.findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const user = await User.findOne({ _id: id, roles: "user" }).populate("reviews.user", "name email");

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        return res.status(200).json({ id: user._id, name: user.name, email: user.email, reviews: user.reviews });

    } catch (error) {
        next(error);
    }
}

//Editar perfil
controller.editProfile = async (req, res, next) => {
    try {

        let { _id } = req.user;
        let { name, email, phone, dui } = req.body;
        let image = req.file ? true : false;


        const user = await User.findOne({ _id: _id });

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        user.name = name;
        user.email = email;
        user.phone = phone;
        user.dui = dui;

        const newUser = await user.save();
        debug(image);

        if (!image) {
            ({ _id, email, name, phone, dui, image } = newUser);

            return res.status(200).json({ _id, email, name, phone, dui, image });
        }else if(!newUser){
            return res.status(500).json({ message: "Error actualizando el perfil" });

        }

        const timestamp = Math.round(new Date().getTime() / 1000);
        const signature = cloudinary.utils.api_sign_request({
            timestamp: timestamp,
            public_id: _id,
            upload_preset: "FoundHound",
            overwrite: true
        }, process.env.CLOUDS);
        const b64 = Buffer.from(req.file.buffer).toString("base64");
        let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
        const formData = new FormData();
        formData.append("file", dataURI);
        formData.append("upload_preset", "FoundHound");
        formData.append("cloud_name", "dlmtei8cc")
        formData.append("public_id", _id);
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

        newUser.image = imageUrl;

        const _newUser = await newUser.save();

        if (!_newUser) {
            return res.status(500).json({ message: "Error actualizando el perfil" });
        }

        ({ _id, email, name, phone, dui, image } = _newUser);

        return res.status(200).json({ _id, email, name, phone, dui, image });


    } catch (error) {
        next(error);
    }
}

module.exports = controller;