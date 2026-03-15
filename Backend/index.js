const express = require("express");
const app = express();
const ConnectToDB = require("./ConnectToDB");
const cors = require("cors");
const dotenv = require("dotenv")
dotenv.config()

// require("dotenv").config()

const PORT = process.env.PORT;

// console.log(process.env);

ConnectToDB()


app.use(cors({
    origin:"*"
}))

app.use(express.json())
app.get("/",(req,res)=>{
res.send("welcome to mynotbook app")
})


app.use("/api/v2.5/auth", require("./Route/Auth.router"))

app.use("/api/v2.5/Contact",require("./Route/Contact.router"))

app.use("/api/v2.5/Note",require("./Route/Note.router"))

// const PORTS = process.env.PORT || 5000;
//   console.log(PORTS);
  

app.listen(PORT,()=>{
    console.log(`Server is running on port http://localhost:${PORT}`);
    
})