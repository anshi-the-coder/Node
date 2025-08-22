const express = require("express");
const {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
} = require("../controllers/user");
const router = express.Router();

// router.get("/", async (req, res) => {
//   const allDbUsers = await User.find({});
//   const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName}- ${user.email}</li>`).join("")}
//     </ul>
//     `;
//   res.send(html);
// });

// GET all users

router.route("/").get( handleGetAllUsers).post(handleCreateNewUser);

// GET / PATCH / DELETE by ID
router
  .route("/:id")
  .get(handleGetUserById)

  .patch(handleUpdateUserById)
  .delete(handleDeleteUserById);

// POST new user
// router.post("/");

module.exports = router;
