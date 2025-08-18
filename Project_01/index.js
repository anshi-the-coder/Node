const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
// const users = require("../MOCK_DATA.json");

const app = express();
const PORT = 8000;

//Connection
mongoose.connect('mongodb://127.0.0.1:27017/youtube-app-2')
.then(()=> console.log('MongoDB Connected'))
.catch(err => console.log('Mongo Error', err));

//Schema
const userSchema = new mongoose.Schema({
firstName:{
  type:String,
  required: true,
},
lastName:{
  type: String,
  required: false,
},
email:{
    type: String,
required:true,
unique: true,
},
jobTitle:{
    type: String,
},
gender:{
    type: String,

},
},
{ timestamps:true}
);

const User= mongoose.model('user', userSchema)


//Middleware
app.use(express.urlencoded({ extended: false })); // Middleware to parse JSON

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()}: ${req.method}: ${req.path}`,
    (err, data) => {
      next();
    }
  );
  // console.log("Hello from middleware 1");
  // // return res.json({msg: 'Hello from middleware 1'});
  // req.myUserName =  "anshikagangwar.developer"
});
// app.use((req, res, next)=>{
//     console.log("Hello from middleware 2",req.myUserName);
//     //  return res.end("Hey");
//     next();
// });

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName}- ${user.email}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// GET all users
app.get("/api/users", async (req, res) => {
    const allDbUsers = await User.find({});

  // res.setHeader("X-MyName", "is Anshika Gangwar");
  // always add x to custom headers

  // res.setHeader('MyName','Anshika Gangwar')
  // console.log("I am in get route", req.myUserName)
  return res.json(allDbUsers);
});

// GET / PATCH / DELETE by ID
app
  .route("/api/users/:id")
  .get(async (req, res) => {
   const user = await User.findById(req.params.id);
    if(!user) return res.status(404).json({error: 'user not found'})
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {lastName: 'Changed'})
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" });
  });

// POST new user
app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  } 

const result= await User.create({
  firstName:body.first_name,
  lastName:body.last_name,
  email:body.email,
  gender:body.gender,
  jobTitle:body.job_title
 });
//  console.log('result',result)
 return res.status(201).json({msg: 'Success'})
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
