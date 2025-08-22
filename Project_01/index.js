const express = require("express");
const userRouter = require('./routes/user')
const { connectMongoDb } = require('./connection')
const {logReqRes}=require("./middlewares");
const app = express();
const PORT = 8000;

//Connection
connectMongoDb("mongodb://127.0.0.1:27017/youtube-app-2").then(()=>console.log('MongoDb connected'))

//Middleware
app.use(express.urlencoded({ extended: false })); // Middleware to parse JSON

app.use(logReqRes('log.txt'));

app.use('/api/user', userRouter);

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
