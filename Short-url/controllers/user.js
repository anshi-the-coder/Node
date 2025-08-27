const { v4: uuidv4 } = require('uuid');
const User = require('../models/user');
const { setUser } = require('../service/auth');

async function handleUserSignup(req, res) {
  try {
    const { name, email, password } = req.body;

    // check if email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.render("signup", { error: "Email already exists" });
    }

    await User.create({
      name,
      email,
      password,
    });

    return res.redirect("/login"); // ✅ signup ke baad login page
  } catch (err) {
    console.error("Signup error:", err);
    return res.status(500).send("Something went wrong");
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });

    if (!user) {
      return res.render('login', {
        error: "Invalid Username or Password",
      });
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    res.cookie('uid', sessionId);

    return res.redirect("/");
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).send("Something went wrong");
  }
}

module.exports = {
  handleUserSignup,
  handleUserLogin,
};
