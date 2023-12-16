const express = require('express');
const app = express();

const profileRoutes = require('./routes/Profile');
const listingRoutes = require('./routes/Listing');
const userRoutes = require('./routes/User');


const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const PORT = process.env.PORT || 4000;

// database connection
database.connect();

// cloudinary connection
cloudinaryConnect();

// middlewares
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(fileUpload({
    useTempFiles:true,
    tempFileDir:'/tmp'
}));

// routes

app.use("/api/v1/auth",userRoutes);
app.use("/api/v1/profile",profileRoutes);
app.use("/api/v1/listing",listingRoutes);

//default route
app.get("/",(req,res)=>{
    res.send("welcome to sage server");
});

app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});
