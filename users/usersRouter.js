const router = require("express").Router();
const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, async (req, res) => {
  try {
    const user = await Users.find();
    res.status(200).json(user);
  } catch {
    res.send({ message: "Something went wrong." });
  }
});

module.exports = router;
