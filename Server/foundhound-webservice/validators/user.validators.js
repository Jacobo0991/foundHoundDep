const { body, param } = require('express-validator');
const duiRegex = /^(?=\d{8}-{1}\d{1})/
const validators = {};

validators.profileValidator = [
    body("name")
        .notEmpty().withMessage("El nombre es obligatorio")
        .isLength({ max: 128 }).withMessage("El nombre no debe exceder los 64 caracteres"),
    body("email")
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("Correo no válido"),
    body("dui")
        .notEmpty().withMessage("El DUI es obligatorio")
        .matches(duiRegex).withMessage("Formato de DUI no válido")
        //Validación customizada para un dui válido
        .custom((dui) => {
            const _dui = dui.replace('-', "");
            let sum = 0, pos = 9;
            for (let i = 0; i < _dui.length - 1; i++) {
                sum = sum + (_dui[i] * pos);
                pos = pos - 1
            }
            sum = 10 - (sum % 10);
            if (sum == _dui[8] || sum == 0) {
                return true;
            } else {
                return false;
            }
        }).withMessage("DUI no válido"),
    body("phone")
        .notEmpty().withMessage("El teléfono es obligatorio")
        //El telefono lo recibe sin guion
        .isMobilePhone("es-SV").withMessage("El número de teléfono no es válido")
];

validators.validateId = [
    param("id")
        .notEmpty().withMessage("Un identificador es necesario")
        .isMongoId().withMessage("Identificador no válido")
]

validators.reviewValidator = [
    body("rating")
        .notEmpty().withMessage("Una calificación es necesaria")
        .isNumeric().withMessage("Calificación no válida"),
    body("content")
        .optional()
        .isLength({max: 150}).withMessage("La reseña no debe exceder los 150 caracteres")
]

validators.registerValidator = [
    body("name")
        .notEmpty().withMessage("El apellido es obligatorio")
        .isLength({ max: 128 }).withMessage("El apellido no debe exceder los 64 caracteres"),
    body("email")
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("Correo no válido"),
    body("image")
        .isURL().withMessage("Imagen no válida")
        .optional(),
    body("dui")
        .notEmpty().withMessage("El DUI es obligatorio")
        .matches(duiRegex).withMessage("Formato de DUI no válido")
        //Validación customizada para un dui válido
        .custom((dui) => {
            const _dui = dui.replace('-', "");
            let sum = 0, pos = 9;
            for (let i = 0; i < _dui.length - 1; i++) {
                sum = sum + (_dui[i] * pos);
                pos = pos - 1
            }
            sum = 10 - (sum % 10);
            if (sum == _dui[8] || sum == 0) {
                return true;
            } else {
                return false;
            }
        }).withMessage("DUI no válido"),
    body("phone")
        .notEmpty().withMessage("El teléfono es obligatorio")
        //El telefono lo recibe sin guion
        .isMobilePhone("es-SV").withMessage("El número de teléfono no es válido"),
];

module.exports = validators;