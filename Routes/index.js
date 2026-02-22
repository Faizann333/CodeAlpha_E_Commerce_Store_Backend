
const {userRouter } = require('./userRoute');
const {adminRouter} = require('./adminRoute');
const {authRouter} = require('./authRoute');

function routes(app){
    app.use('/api/user',userRouter);
    app.use('/api/admin',adminRouter);
    app.use('/api/auth',authRouter);
}

module.exports = {routes};