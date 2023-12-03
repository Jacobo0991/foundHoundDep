const express = require('express');
const multer = require('multer'); 
const router = express.Router();
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage});
const ROLES = require("../data/roles.constants.json");
const userController = require('../controllers/user.controller');
const runValidation = require('../validators/index.middleware');
const { authentication, authorization } = require("../middlewares/auth.middlewares");
const { validateId, reviewValidator, profileValidator} = require('../validators/user.validators');

//Calificar usuario
router.post("/review/:id", authentication, authorization(ROLES.USER), validateId, reviewValidator, runValidation, userController.reviewUser);

//Actualizar perfil
router.patch("/profile/", upload.single('image'), authentication, profileValidator, runValidation, userController.editProfile);

//Ver usuario
router.get("/profile/:id", validateId, runValidation, userController.findOneById);

module.exports = router;