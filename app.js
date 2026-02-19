const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();


const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_DB_URL).then(()=>{
    console.log("Connected to MongoDB");
    app.listen(PORT,()=>{
        console.log(`Server is running on port http://localhost:${PORT}`);
    })
}).catch((err)=>{
    console.error("Error connecting to MongoDB", err);
})