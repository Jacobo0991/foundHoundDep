const { body, param } = require('express-validator')
const POST_CONSTANTS = require("../data/posts.constants.json");
const validators = {};

validators.validateId = [
    param("id")
        .notEmpty().withMessage("Un identificador es necesario")
        .isMongoId().withMessage("Identificador no válido")
]

//Validar la información proporcionada a la publicación
validators.validateInfo = [
    body("email")
        .notEmpty().withMessage("El correo es obligatorio")
        .isEmail().withMessage("Correo no válido"),
    body("phone")
        .notEmpty().withMessage("El teléfono es obligatorio")
        //El telefono lo recibe sin guion
        .isMobilePhone("es-SV").withMessage("El número de teléfono no es válido"),
    body("message")
        .notEmpty().withMessage("El mensaje es obligatorio")
        .isLength({max: 200}).withMessage("El mensaje no debe superar los 200 caracteres")
]

validators.reportValidator = [
    body("content")
        .notEmpty().withMessage("La razón del reporte es obligatoria")
        .isLength( {max: 150} ).withMessage("La razón del reporte no debe superar los 150 caracteres")
]

//Validar el estado al cambiarlo
validators.validateStatus = [
    body("status")
        .notEmpty().withMessage("El estado es obligatorio")
        .isIn([POST_CONSTANTS.STATUS.ACTIVE, POST_CONSTANTS.STATUS.HIDDEN, POST_CONSTANTS.STATUS.RESOLVED]).withMessage("Estado inválido")
]

validators.validateCategory = [
    //Validar la categoría del post
    param("category")
        .optional()
        .isIn([POST_CONSTANTS.CATEGORY.FOUND, POST_CONSTANTS.CATEGORY.LOST]).withMessage("Categoría no válida"),
]

//Validar el formulario para los filtros
validators.validateFilter = [
    body("search")
        .optional().trim().isLength({ max: 150})

];

//Validar el formulario para crear o actualizar post
validators.savePostValidator = [
    param("id")
        .optional()
        .isMongoId().withMessage("Post no válido"),
    body("name")
        .optional()
        .trim().isLength({ max: 32}).withMessage("El nombre no debe exceder los 32 caracteres"),
    body("animal")
        .notEmpty().withMessage("El tipo de animal es necesario"),
    body("breed")
        .notEmpty().withMessage("La raza de la mascota es necesaria"),
    body("sex")
        .notEmpty().withMessage("El sexo de la mascota es necesario"),
    body("color")
        .notEmpty().withMessage("El color de la mascota es necesario"),
    body("description")
        .notEmpty().withMessage("La descripción de la mascota es necesaria")
        .trim().isLength({ max: 150}).withMessage("La descripción no debe exceder los 150 caracteres"),
    body("date")
        .notEmpty().withMessage("La fecha es necesaria")
        .isISO8601().withMessage("Fecha no válida"),
    body("status")
        .optional()
        .isIn([POST_CONSTANTS.STATUS.ACTIVE, POST_CONSTANTS.STATUS.HIDDEN, POST_CONSTANTS.STATUS.REPORTED, POST_CONSTANTS.STATUS.RESOLVED]).withMessage("Estado no válido")

];

module.exports = validators;