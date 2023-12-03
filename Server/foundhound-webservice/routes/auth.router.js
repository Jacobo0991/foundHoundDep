const express = require('express');
const multer = require('multer'); 
const router = express.Router();
const storage = multer.memoryStorage(); // Store the file in memory
const upload = multer({ storage: storage});
const authController = require('../controllers/auth.controller');
const runValidation = require('../validators/index.middleware');
const { authentication } = require("../middlewares/auth.middlewares");
const { registerValidator, recoveryValidator, codeValidator } = require('../validators/auth.validators');

//Registrar usuario
router.post("/register/", upload.single("image"), registerValidator, runValidation, authController.register);

//Recuperación de contra
router.post("/recovery-code/:role", recoveryValidator, runValidation, authController.sendCode);
router.post("/confirm-code/:role", codeValidator, runValidation, authController.compareCode);

//Iniciar sesión role: user para público, mod para privado
router.post("/login/:role", authController.login);

//Retorna la información del usuario loggeado
router.get("/whoami", authentication, authController.whoami);   
// router.get("/email", authController.contactForm);   


module.exports = router;