const express = require('express');
const {postSignUpController, postLoginController,postLogoutController, getMeController} = require('../Controllers/authController');

const authRouter = express.Router();

authRouter.post('/sign-up',postSignUpController);
authRouter.post('/login',postLoginController);
authRouter.post('/logout',postLogoutController);
authRouter.get('/get-me', getMeController); 

module.exports = {authRouter};