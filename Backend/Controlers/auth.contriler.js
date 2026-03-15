   
const AuthModel = require('../Schema/Auth.model');
const bcrypt = require("bcryptjs")
const jwt = require('jsonwebtoken');
const AuthVerify = require('../middleware/authverify.middleware');
const SECRET_KEY = process.env.SECRET_KEY

    //sinup ke liye controler
  
   const signupFun = async (req, res) => {

    console.log(req.body)
  const {name, email ,password}=req.body;


  if(!password){
     
      return res.status(404).send({
         success:false,
         message: "Passowrd is Required!"
      })

  }

  if(password.length <8){
    return res.status(400).send({
        success: false,
        message: "password mus atleast 8 characters!"
    })
  }

  let user = await AuthModel.findOne({email})
  if(user){
    return res.status(400).send({
        success: false,
        message: "YOur Acount is Already Exist!"
    })
  }

  try {
    const salt =await bcrypt.genSalt(10)
    const hashPassord =await bcrypt.hash(password,salt)
    user = await AuthModel.create({name,email,password :hashPassord})
    res.status(201).send({
        success:true,
        message: "Acount is Created Successfully!",
        user
    })
    
  } catch (error) {

        let message = Object.values(error.errors)[0].properties.message
        if (!message) message = "Internal server error!"

        return res.status(500).send({
            success: false,
            message
        })
    }
}
 //logi ke liye controler
const loginFun = async (req, res) => {
    const {email, password} = req.body

    try {
        const user = await AuthModel.findOne({email})
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "User Not Found!"
            })
        }   
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).send({
                success: false,
                message: "Invalid Password!"
            })
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY)

        res.status(200).send({
            success: true,
            message: "Login Successfully!",
            user,
            token
        })
    } catch (error) {
        console.log(error);
        
        const message = error?.errors
  ? Object.values(error.errors)[0].properties.message
  : "Internal server error!" 
        return res.status(500).send({
            success: false,
            message
        })
    }

}
//profile get karne ke liye controller
const profileFun =  async (req, res) => {
    const token = req.header("auth-token");

    console.log(token);
    

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized!"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await AuthModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Account does not exist!"
            });
        }

        return res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.log("JWT Error:", error.message);

        return res.status(401).json({
            success: false,
            message: "Invalid or expired token!"
        });
    }
}

//profile update karne ke liye controller

const  updateProfileFun = async (req, res) => { 

      const { phone, age, gender, address, city, state, country, pincode } = req.body;
      try { 
        const user = await AuthModel.findById(req.user)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Account does not exist!"
            })
        }
        if (phone) user.phone = phone;
        if (age) user.age = age;    
        if (gender) user.gender = gender;
        if (address) user.address = address;
        if (city) user.city = city;
        if (state) user.state = state;
        if (country) user.country = country;
        if (pincode) user.pincode = pincode;
         const updateuser= await user.save();
        res.status(200).send({
            success: true,
            message: "Profile Updated Successfully!",
            user:updateuser
        })
    } catch (error) {
        let message = Object.values(error.errors)[0].properties.message
        if (!message) message = "Internal server error!"
        return res.status(500).send({
            success: false,
            message
        })
    }
}
//profile delete karne ke liye controller
const deleteProfileFun = async (req, res) => { 
    try {
        const user = await AuthModel.findByIdAndDelete(req.user)
        if (!user) {
            return res.status(400).send({
                success: false,
                message: "Account does not exist!"
            })
        }
        res.status(200).send({
            success: true,
            message: "Account deleted successfully!",
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).send({
            success: false,
            message: "Internal server error!"
        })
    }
}


module.exports = {signupFun, loginFun, profileFun, updateProfileFun, deleteProfileFun}



