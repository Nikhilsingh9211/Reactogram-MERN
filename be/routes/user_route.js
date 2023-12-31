const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const UserModel = mongoose.model("UserModel");

router.post("/signup", (req, res) => {
  const { fullName, email, password, profileImg } = req.body;
  if (!fullName || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }
  UserModel.findOne({ email: email })
    .then((userInDB) => {
      if (userInDB) {
        return res
          .status(500)
          .json({ error: "User with this email already registered" });
      }
      bcryptjs
        .hash(password, 16)
        .then((hashedPassword) => {
          const user = new UserModel({
            fullName,
            email,
            password: hashedPassword,
            profileImg,
          });
          user
            .save()
            .then((newUser) => {
              res.status(201).json({ result: "User Signed up Successfully!" });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
