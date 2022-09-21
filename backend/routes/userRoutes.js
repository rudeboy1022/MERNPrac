const express = require("express");

//controller func
const {
  loginUser,
  signupUser,
  getUser,
  deleteUser,
} = require("../controller/userController");

const router = express.Router();

router.post("/signup", signupUser);

router.get("/users", getUser);

router.post("/login", loginUser);

// app.patch("/user/:id", async (req, res) => {
//   try {
//     await userModel.findByIdAndUpdate(req.params.id, req.body);
//     await userModel.save();
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

router.delete("/user/:id", deleteUser);
module.exports = router;
