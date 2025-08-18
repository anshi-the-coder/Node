const express = require("express");
const fs = require("fs");
const users = require("../MOCK_DATA.json");

const app = express();
const PORT = 8000;

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

app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// GET all users
app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "is Anshika Gangwar");
  // always add x to custom headers

  // res.setHeader('MyName','Anshika Gangwar')
  // console.log("I am in get route", req.myUserName)
  return res.json(users);
});

// GET / PATCH / DELETE by ID
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    if(!user) return res.status(404).json({error: 'user not found'})
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "pending" });
  })
  .delete((req, res) => {
    return res.json({ status: "pending" });
  });

// POST new user
app.post("/api/users", (req, res) => {
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
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("../MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "success", id: users.length });
  });
});

app.listen(PORT, () => console.log(`Server Started at PORT: ${PORT}`));
