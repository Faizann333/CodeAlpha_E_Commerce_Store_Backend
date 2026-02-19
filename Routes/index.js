const express = require('express');
const {userRouter } = require('./userRoute');
const {adminRouter} = require('./adminRoute');
const {authRouter} = require('./authRoute');

function routes(app){
    app.use('/user',userRouter);
    app.use('/admin',adminRouter);
    app.use('/auth',authRouter);
}

module.exports = {routes};