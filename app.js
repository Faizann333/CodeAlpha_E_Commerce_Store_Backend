const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const {routes} = require('./Routes/index');
const cookieParser = require("cookie-parser");

dotenv.config();

const app = express();

//"http://localhost:5173"   for  local development
app.use(cors({
    origin:  "https://flonestore.vercel.app",
    credentials: true,
  }));
app.use(cookieParser());
app.use(express.json());

routes(app);

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}).catch((err)=>{
    console.error("Error connecting to MongoDB", err);
})