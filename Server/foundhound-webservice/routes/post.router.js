const express = require('express');
const multer = require('multer'); 
const router = express.Router();
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage});
const ROLES = require("../data/roles.constants.json");
const postController = require('../controllers/post.controller');
const runValidation = require('../validators/index.middleware');
const { authentication, authorization } = require("../middlewares/auth.middlewares");
const { savePostValidator, validateCategory, validateId, validateFilter, validateStatus, reportValidator, validateInfo } = require('../validators/post.validators');

//Búsqueda
router.get("/reported/", authentication, authorization(ROLES.MOD), runValidation, postController.findReported);
router.get("/category/:category", validateCategory, validateFilter, runValidation, postController.findAll);
router.get("/id/:id", validateId, runValidation, postController.findOneById);
router.get("/user/:id", validateId, runValidation, postController.findByUser);
router.get("/my-posts/", authentication, authorization(ROLES.USER), postController.findOwn);

//Enviar información sobre el anuncio
router.post("/provide-info/:id", upload.single(""), authentication, authorization(ROLES.USER), validateId, validateInfo, runValidation, postController.provideInfo);

//Crear post
router.post(["/create/:category", "/update/:id"], upload.single("image"), authentication, authorization(ROLES.USER), validateCategory, savePostValidator, runValidation, postController.savePost);

//Modificacion de post
router.patch("/status/:id", upload.single(""), authentication, authorization(ROLES.USER), validateId, validateStatus, runValidation, postController.changeStatus);
router.patch("/report/:id", upload.single(""), authentication, authorization(ROLES.USER), validateId, reportValidator, runValidation, postController.reportPost);


module.exports = router;