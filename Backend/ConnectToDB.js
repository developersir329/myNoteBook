const mongoose = require("mongoose");

const ConnectToDB = async ()=>{
  console.log(process.env.DB_URLS);
  
   try {
     await mongoose.connect(process.env.DB_URLS)
     console.log("connect to Database");
     
   } catch (error) {
    console.log("Error");
    
   }
}

module.exports = ConnectToDB