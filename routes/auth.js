/*

Rutas usuarios / auth
host + /api/auth

*/

const express = require("express");
const router = require("express").Router();
const {check} = require('express-validator');
const {createUser, renewToken, loginUser} = require('../controllers/auth');
const { validarCampos } = require("../middlewares/validar-campos");
const validarJWT = require("../middlewares/validarJWT");


router.post('/',
    [
        check('email','El campo email es obligatorio').isEmail(),
        check('password','El campo password es obligatorio').isLength({min: 6}),
        validarCampos,
    ], 
    loginUser);

router.post(
    '/new', 
    [//Middlewares https://express-validator.github.io/docs/check-api

        check('name', 'Nombre es Obligatorio').not().isEmpty(),
        check('email', 'El Email es Obligatorio').isEmail(),
        check('password', 'Password es invalido').isLength({min: 6}),
        validarCampos,

    ],
    createUser )
router.get(
    '/renew',
     validarJWT , 
    renewToken
    )

module.exports = router;