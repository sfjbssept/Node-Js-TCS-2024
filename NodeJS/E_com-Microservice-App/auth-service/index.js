const express = require("express")
const app = express();
const PORT = 7070
const mongoose = require("mongoose");
const User = require("./User");
const jwt= require("jsonwebtoken")

app.use(express.json())
mongoose.connect(
    "mongodb://localhost:27017/auth-service",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
).then(() =>{
    console.log("Mongoose is connected to auth DB");
})

//  register a new user
app.post("/auth/register", async(req,res) => {
    const {name,email,password,} = req.body;
    const userExists = await User.findOne({ email })
    if(userExists) {
        return res.json({message: "User already exists"});
    } else {
        const newUser = new User({
            name,
            email,
            password
        })
        newUser.save()
        return res.json(newUser)
    }
})

// login a new user
app.post("/auth/login",async( req,res) => {
    const {email,password} = req.body;
    const user= await User.findOne({email});
    if(!user) {
        return res.json({message:"User dose not exist"})
    } else {

        // check if the enteted password is correct
        if(password != user.password) {
            return res.json({message:"Incorrect password"})
        }
        const payload = {
            email,
            name: user.name,

        };
        jwt.sign(payload,"secret",(err,token) => {
            if(err) console.log(err);
            else {
                return res.json({token : token});
            }
        })
    }
})




app.listen(PORT, () => {
    console.log(`Auth service is running at ${PORT}`);
})