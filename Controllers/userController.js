const users = require('../Models/userSchema');

const jwt = require('jsonwebtoken');

// register logic
exports.register= async(req,res)=>{
    console.log('inside register function');

    const{username,email,password} = req.body
    try{
        // if check the email is already in db user already registered
        const existingUser = await users.findOne({email})
    if(existingUser){
        res.status(401).json("user already registered")
    }
    // if the email is not present in db , new user registration is created
    else{
        const newUser = await users({
            username,email,password,github:"",link:"",profile:""
        })
        await newUser.save()
        res.status(200).json("Successfully registered")
    }
    }
    catch(err){
        res.status(500).json("server error: "+err.message)
    }
}

// login logic
exports.login= async(req,res)=>{
    const{email,password} = req.body
    try{
        const user = await users.findOne({email,password})
    if(user){
        // token generation
        const token = jwt.sign({userId:user._id},'superkey2024')
        res.status(200).json({user,token})
    }
    else{
        res.status(401).json("Invalid Login")
    }
    }
    catch(err){
        res.status(500).json("server error: "+err.message)
    }
}