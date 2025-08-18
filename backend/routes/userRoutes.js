const express = require('express');
const router = express.Router();
const userSchema = require('../models/userdata');

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    
    const user = await userSchema.findOne({ username, email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }

    
    if (user.password === password) {
      return res.status(200).send({ message: "Login successful" });
    } else {
      return res.status(401).send({ message: "Invalid password" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error in Server" });
  }
});

module.exports = router;