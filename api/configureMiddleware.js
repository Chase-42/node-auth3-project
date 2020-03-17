const express = require("express");
const helmet = require("helmet");

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      "Origin"
    )}`
  );

  next();
}

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(logger);
};
