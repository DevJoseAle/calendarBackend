/*
    Event Route = 
    /api/events
*/

const express = require("express");
const router = require("express").Router();
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helper/isDate");
const validarJWT = require("../middlewares/validarJWT");
const { createEvent, getEvent, actEvent, deleteEvent } = require("../controllers/events");

//Todas las rutas que estén por debajo, pasaran por el middleware de validar
router.use(validarJWT);
isDate

//Create
router.post('/',
    [
        check('title', 'Titulo es Obligatorio').not().isEmpty(),
        check('note', 'La nota es Obligatoria').not().isEmpty(),
        check('start', 'Fecha inicio es obligatoria').custom(isDate),
        check('end', 'Fecha final es obligatoria').custom(isDate),
        validarCampos
    ], 
    createEvent);

//obtener eventos
router.get('/', getEvent);


//Actualizar Eventos
router.put('/:id',
    [
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Fecha de inicio es obligatoria').custom( isDate ),
        check('end','Fecha de finalización es obligatoria').custom( isDate ),
        validarCampos
    ],
    
    actEvent);

//Eliminar
router.delete('/:id', deleteEvent);

module.exports = router;