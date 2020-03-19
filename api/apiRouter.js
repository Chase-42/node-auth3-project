const router = require("express").Router();

const authRouter = require("../auth/authRouter.js");
const usersRouter = require("../users/usersRouter");

router.use("/auth", authRouter);
router.use("/users", usersRouter);

router.get("/", (req, res) => {
  res.json({ message: "API is up and running!" });
});

module.exports = router;
