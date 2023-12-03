const { body, param } = require('express-validator');
const ROLES = require('../data/roles.constants.json');
const validators = {};
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!¿#$&*+-.:@[\]^_{}~])(?=.{8,32})/
const duiRegex = /^(?=\d{8}-{1}\d{1})/

validators.recoveryValidator = [
    param("role").notEmpty().withMessage("El rol es obligatorio")
        .isIn([ ROLES.ADMIN, ROLES.MOD, ROLES.USER ]).withMessage("Parámetro inválido"),
    body("identifier")
        .notEmpty().withMessage("Un identificador es necesario")
]

validators.codeValidator = [
    param("role").notEmpty().withMessage("El rol es obligatorio")
        .isIn([ ROLES.ADMIN, ROLES.MOD, ROLES.USER ]).withMessage("Parámetro inválido"),
        body("identifier")
        .notEmpty().withMessage("Un identificador es necesario"),
    body("code")
        .notEmpty().withMessage("Un código es necesario"),
    body("pass")
        .optional()
        .matches(passwordRegex).withMessage("Formato de contraseña inválido")
]

validators.registerValidator = [
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
        .isMobilePhone("es-SV").withMessage("El número de teléfono no es válido"),
    body("password")
        .notEmpty().withMessage("La contraseña es obligatoria")
        .matches(passwordRegex).withMessage("Formato de contraseña inválido")
];

module.exports = validators;