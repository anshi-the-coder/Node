const express = require("express");
const users = require("../MOCK_DATA.json")
const app = express();
const PORT = 8000;


app.get("/users",(req,res)=>{
    const html=`
    <ul>
    ${users.map(user =>`<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
    res.send(html);
})
//Routes
app.get("/api/users",(req,res)=>{
    return res.json(users);
});

app.route("/api/users/:id").get("/api/users/:id",(req,res)=>{
    const id= Number(req.params.id);
    const user= users.find((user)=> user.id===id);
    return res.json(user);
})
.patch((req,res)=>{
    return  res.json({status: "Panding"})
})
.delete((req,res)=>{
    return  res.json({status: "Panding"})
});
app.post("/api/users",(req,res)=>{
   return  res.json({status: "Panding"});
});
// app.patch("/api/users:id",(req,res)=>{
//    return  res.json({status: "Panding"});
// });
// app.delete("/api/users:id",(req,res)=>{
//    return  res.json({status: "Panding"});
// });
app.listen(PORT,()=>console.log(`Server Started at PORT:${PORT}`))