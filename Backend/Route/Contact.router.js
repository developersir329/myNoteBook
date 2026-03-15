const express = require('express')
const router = express.Router();
// const AuthVerify = require('../middleware/authverify.middleware');
// const AuthModel = require("../Schema/Auth.model");
const ContactModel =require("../Schema/Contact.model")
const sendMail = require("../uitile/sendmailer")
router.post("/message", async (req, res) => { 
const {FullName,Email,Message}=req.body;

if(!FullName||!Email||!Message){
    return res.status(404).send({
        success:false,
        message:"All Field Is Required"
    });
}
if(Message.length<10){
    return res.status(400).send({
        success:false,
        message:"message must be atleast 10 character!"
    });
}
 try {
    // const user = await AuthModel.findById(req.user)
            // if (!user) {
            //     return res.status(400).send({
            //         success: false,
            //         message: "Account does not exist!"
            //     })
            // }
    await ContactModel.create(req.body);
 sendMail(FullName,Email);
 res.status(201).send({
    success:true,
    message:"Send message successfully!"
 })
 } catch (error) {
   
     let message = Object.values(error.errors)[0].properties.message
     console.log(message);
     
        if (!message) message = "Internal server error!"

        return res.status(500).send({
            success: false,
            message
        })
 }
})

module.exports = router;