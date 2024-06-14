const express = require('express');
const userRouter = require('./user.router');
const cityRouter = require('./city.controllers');
const imageRouter = require('./image.router');
const hotelRouter = require('./hotel.router');
const router = express.Router();
const reviewRouter = require('./review.router');
const bookingRouter = require('./booking.router');
// colocar las rutas aquí
router.use(userRouter);
router.use(cityRouter);
router.use(imageRouter);
router.use(hotelRouter);
router.use(reviewRouter);
router.use(bookingRouter);

module.exports = router;