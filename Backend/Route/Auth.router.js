const express = require('express')
const router = express.Router();
const AuthModel = require('../Schema/Auth.model');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const AuthVerify = require('../middleware/authverify.middleware');
const SECRET_KEY = process.env.SECRET_KEY   
const { signupFun,loginFun,profileFun,updateProfileFun,deleteProfileFun} = require('../Controlers/auth.contriler');

router.post("/signup", signupFun)

router.post("/login", loginFun)

router.get("/profile", profileFun)

router.put("/profile", AuthVerify,updateProfileFun )

router.delete("/profile", AuthVerify,deleteProfileFun )
module.exports = router;