const User=require('../models/User');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');

const generateToken=(id)=>{
    return jwt.sign({id},process.env.jwt_secret,{
        expiresIn:'2d'
    })
}

const registerUser=async(req,res)=>{
    try {
        const data=req.body;
        // console.log(data);
        const {name, email, password, dateOfBirth, cnic}=data;
        // console.log(`Name: ${name} \n email: ${email} \n password: ${password} \n Date of Birth: ${dateOfBirth} \n cnic: ${cnic}`)

        if(!name || !email || !password || !dateOfBirth || !cnic){
            return res.status(400).json({message:"Please fill all the fields"})
        }

        const userExists=await User.findOne({email});
        console.log(`userExists: ${userExists}`)
        if(userExists){
            return res.status(400).json({message:"User already exists"})
        }
        const cnicExists=await User.findOne({cnic});
        // console.log(`cnicExists: ${cnicExists}`)
        if(cnicExists){
           return res.status(400).json({message:"User with this CNIC already exists"})
        }

        const salt=await bcrypt.genSalt(10);
        // console.log(`Salt: ${salt}`)
        const hashedPassword=await bcrypt.hash(password,salt);
        // console.log(`Hashed Password: ${hashedPassword}`)

        const user=await User.create({
            name,
            email,
            password:hashedPassword,
            dateOfBirth,
            cnic
        })
        
        // console.log(`User: ${user}`)
        res.status(201).json({
            _id:user.id,
            name:user.name,
            email:user.email,
            dateOfBirth:user.dateOfBirth,
            cnic:user.cnic,
            token:generateToken(user.id)
        })

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      })
    }

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      dateOfBirth: user.dateOfBirth,
      cnic: user.cnic,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports={registerUser, loginUser}