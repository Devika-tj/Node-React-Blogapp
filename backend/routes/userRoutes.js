const express = require('express');
const router = express.Router();
const userSchema = require('../models/userdata');
const jwt=require('jsonwebtoken')

router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.post("/login", async (req, res) => {
   const { username, email, password } = req.body;
  try {
   const user = await userSchema.findOne({ username, email });
    if (!user) {
      return res.status(401).send({ message: "User not found" });
    }
     if (user.password === password) {
      const payload = {
       id: user._id,
       username: user.username,
       email: user.email
};

      const token=jwt.sign(payload,"secret")
      return res.json({success:true,message:"Logined sucussfully", usertoken:token})
     
   
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error in Server" });
  }
});

module.exports = router;