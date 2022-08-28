const users = require("../users.json");
const express = require("express");
const app = express();

// middleware to verify if user exists

const verifyExistingUser = (req, res, next) => {
  const user = users.find((user) => user.slug === req.params.slug);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  next();
};

module.exports = {
  verifyExistingUser: verifyExistingUser,
};
