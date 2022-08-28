const express = require("express");
const app = express();
const { body, validationResult } = require("express-validator");
const slugify = require("slugify");

const users = require("../users.json");

const { verifyExistingUser } = require("../middlewares/middlewares");

app.get("/", (req, res) => {
  res.json(users);
});

app.get("/:slug", verifyExistingUser, (req, res) => {
  const user = users.find((user) => user.slug === req.params.slug);

  res.json(user);
});

app.post(
  "/",
  body("name")
    .isLength(4, 8)
    .withMessage("Name must be between 4 and 8 characters"),
  body("email").isEmail().withMessage("Email must be valid"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
  body("city")
    .isIn(["Paris", "Tokyo", "Los Angeles"])
    .withMessage("You're not from Paris, Tokyo or Los Angeles, sorry."),
  body("profile_picture").exists(),
  (req, res) => {
    const { errors } = validationResult(req);

    if (errors.length > 0) {
      res.status(400).json(errors);
    } else {
      const user = req.body;
      user.slug = slugify(user.name);
      users.push(user);
      res.json(user);
    }
  }
);

module.exports = app;
