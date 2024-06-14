const { getAll, create, getOne, remove, update } = require('../controllers/image.controllers');
const express = require('express');
const verifyJWT = require('../utils/verifyJWT');
const imageRouter = express.Router();

imageRouter.route('/images')
    .get(verifyJWT, getAll)
    .post(verifyJWT, create);

imageRouter.route('/images/:id')
    .get(verifyJWT, getOne)
    .delete(verifyJWT, remove)
    .put(verifyJWT, update);

module.exports = imageRouter;