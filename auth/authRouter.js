const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const Users = require("../users/users-model.js");

router.post("/register", async (req, res, next) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;
  try {
    const newUser = await Users.add(user);
    const token = generateToken(newUser);
    res.status(201).json({
      message: `Welcome ${user.username}! Have a token...`,
      token
    });
  } catch (err) {
    next(err);
  }
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user); // new line

        // the server needs to return the token to the client
        // this doesn't happen automatically like it happens with cookies
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token // attach the token as part of the response
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    userid: user.id,
    username: user.username
  };
  const options = { expiresIn: "1h" };
  const token = jwt.sign(payload, secrets.jwtSecret, options);
  return token;
}

module.exports = router;
