const mongoose = require("mongoose");
 const ContactSchema = new mongoose.Schema({

   FullName: {
    type: String,
    required: [true, "Full Name is required"],
  },
  Email: {
    type: String,
    required: [true, "Email is required"],
    match: [/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/, "Invalid email!"]
  },
  Message: {
    type: String,
    required: [true, "Message is required"],
    minlength: [10, "Message must be at least 10 characters"],
  },

 },{timestamps:true});

 const Contact = mongoose.model("Contact",ContactSchema)

 module.exports = Contact