const Post = require("../models/Post.model");
const axios = require("axios");
const { sendEmailWithNodemailer } = require("../utils/email.tools");
const cloudinary = require("cloudinary").v2;

const debug = require("debug")("app:post-controller")

const controller = {};

//Mostrar los posts
controller.findAll = async (req, res, next) => {
    try {
        const { category } = req.params;
        const { pagination, limit, offset } = req.query;

        const filter = Object.assign({
            status: "active", category: category,
        });
        const posts = await Post.find(filter, undefined, {
            sort: [{ createdAt: -1 }],
            limit: pagination ? limit : undefined,
            skip: pagination ? offset : undefined
        }).populate("user", "name email").populate("helpers", "name email");

        return res.status(200).json({ posts, count: pagination ? await Post.countDocuments(filter) : undefined });

    } catch (error) {
        next(error);
    }
}

controller.findOneById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const post = await Post.findOne({ _id: id, status: "active" }).populate("user", "name email").populate("helpers", "name email");

        if (!post) {
            return res.status(404).json({ error: "Post no encontrado" });
        }

        return res.status(200).json({ post })

    } catch (error) {
        next(error);
    }
}

controller.findByUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const posts = await Post.find({ user: id, status: "active" }).populate("user", "name email").populate("helpers", "name email");

        return res.status(200).json({ posts })

    } catch (error) {
        next(error);
    }
}

controller.findOwn = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { pagination, limit, offset } = req.query;
        const posts = await Post.find({ status: "active", user: _id }, undefined, {
            sort: [{ createdAt: -1 }],
            limit: pagination ? limit : undefined,
            skip: pagination ? offset : undefined
        }).populate("user", "name email").populate("helpers", "name email");

        return res.status(200).json({ posts, count: pagination ? await Post.countDocuments({ status: "active", user: _id }) : undefined });

    } catch (error) {
        next(error);
    }
}

controller.savePost = async (req, res, next) => {
    try {
        const user = req.user;
        const { category, id } = req.params;
        let image = req.file ? true : false;

        const { name, animal, breed, sex, color,
            description, localization, date } = req.body;

        let post = await Post.findById(id);

        if (!post) {
            post = new Post();

            post.user = user._id;
            post.category = category;
        } else {
            if (!post["user"].equals(user._id)) {
                return res.status(403).json({ error: "Forbidden" })
            }
        }

        post.name = name;
        post.animal = animal;
        post.breed = breed;
        post.sex = sex;
        post.color = color;
        post.description = description;
        post.localization = localization;
        post.date = date;

        const savedPost = await post.save({ setDefaultsOnInsert: true });
        if (image) {
            const timestamp = Math.round(new Date().getTime() / 1000);
            const signature = cloudinary.utils.api_sign_request({
                timestamp: timestamp,
                public_id: savedPost._id,
                upload_preset: "FoundHound",
                overwrite: true
            }, process.env.CLOUDS);
            const b64 = Buffer.from(req.file.buffer).toString("base64");
            let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
            const formData = new FormData();
            formData.append("file", dataURI);
            formData.append("upload_preset", "FoundHound");
            formData.append("cloud_name", "dlmtei8cc")
            formData.append("public_id", savedPost._id);
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
            savedPost.image = imageUrl;
            await savedPost.save();
        }



        if (!savedPost) {
            return res.status(500).json({ error: "Error guardando el post" });
        }

        return res.status(200).json({ savedPost });

    } catch (error) {
        next(error);
    }
}

//Obtener las publicaciones reportadas
controller.findReported = async (req, res, next) => {
    try {

        const posts = await Post.find({ reports: { $exists: true, $not: { $size: 0 } } }).sort({ createdAt: -1 }).populate("user", "name email").populate("helpers", "name email");

        return res.status(200).json(posts);

    } catch (error) {
        next(error);
    }
}

//Reportar la publicacion
controller.reportPost = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { content } = req.body;
        const { _id } = req.user;

        let post = await Post.findOne({ _id: id }).populate("user", "name email").populate("helpers", "name email");

        if (!post) {
            res.status(404).json({ error: "Post no encontrado" })
        }

        let _reports = post.reports;

        const prevIndex = _reports.findIndex(r => r.user.equals(_id));

        if (prevIndex >= 0) {
            //El comentario ya existe
            const _report = _reports[prevIndex];
            _report.content = content;

            _reports[prevIndex] = _report;
        } else {
            //El comentario no existe
            _reports = [..._reports, { user: _id, content: content }]

        }
        //Guardamos el post - commit
        post["reports"] = _reports;
        const newPost = await (await post.save()).populate("reports.user", "email").populate("helpers", "name email");

        //Retornamos el post actualizado
        return res.status(200).json({ newPost });

    } catch (error) {
        next(error);
    }
}

//Cambiar el estado (ocultar o dar por resuelto)
controller.changeStatus = async (req, res, next) => {
    try {
        const { _id } = req.user;
        const { status } = req.body;
        const { id } = req.params;

        let post = await Post.findOne({ _id: id, user: _id }).populate("user", "name email").populate("helpers", "name email");

        if (!post) {
            res.status(404).json({ error: "Post no encontrado" })
        }

        post.status = status;

        const newPost = await post.save();

        return res.status(200).json({ newPost });

    } catch (error) {
        next(error);
    }
}

//Dar la información en el post 
controller.provideInfo = async (req, res, next) => {
    try {
        const { _id, name } = req.user;
        //Obtener el id del post (url)
        const { id } = req.params;
        //Obtener info del usuario (form)
        const { email, phone, message } = req.body;

        let post = await Post.findOne({ _id: id }).populate("user", "name email").populate("helpers", "name email");

        if (!post) {
            res.status(404).json({ error: "Post no encontrado" })
        }
        //Obtener el correo del duenio del post
        const emailOp = post.user.email;

        //Enviarle un correo con la info proporcionada

        const emailData = {
            from: "foundhound09@gmail.com",
            to: emailOp,
            subject: `${name} tiene información sobre tu publicación`,
            html: `
                    <p><b>Mensaje: </b>${message}</p>
                    <p><b>Información de contacto: </b></p>
                    <p><b>Correo: </b>${email}</p>
                    <p><b>Teléfono: </b>${phone}</p>
                    <br>
                    <p>FoundHound no se hace responsable por la información previamente expuesta.<p>
                `,
        };

        const emailConfirmation = await sendEmailWithNodemailer(req, res, emailData);
        if (!emailConfirmation) {
            return res.status(500).json({ error: "Internal server error" })
        }
        let _helpers = post.helpers;
        const prevIndex = _helpers.findIndex(r => r.equals(_id));

        if (prevIndex < 0) {
            //El usuario no está registrado como helper
            _helpers = [_id, ..._helpers];
            post.helpers = _helpers;

            const newPost = await (await post.save()).populate("user", "name email").populate("helpers.user", "name email");
            return res.status(200).json({ newPost });
        }

        return res.status(200).json({ post })

    } catch (error) {
        next(error);
    }
}

module.exports = controller;