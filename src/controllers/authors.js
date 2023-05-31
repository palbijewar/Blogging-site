const Author = require('../models/authorSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {isValid,isValidTitle} = require('../utils/validators');

const authors = async(req,res)=>{
    try {
    const {fname,lname,title,email,password} = req.body;
    if(!isValid(fname)) return res.status(400).json({status:false,message:"invalid first name"});
    if(!isValid(lname)) return res.status(400).json({status:false,message:"invalid last name"});
    if(!isValid(title)) return res.status(400).json({status:false,message:"title is required"});
    if(!isValidTitle(title)) return res.status(400).json({status:false,message:"title should be Mr, Miss or Mrs"});
    if(!isValid(email)) return res.status(400).json({status:false,message:"invalid email"});
    if(!isValid(password)) return res.status(400).json({status:false,message:"invalid password"});
    const hashPass = await bcrypt.hash(password,10);
    const newUser = await Author({fname,lname,title,email,password:hashPass});
    const users = await newUser.save();
    res.status(201).json({status:true,data:users});
    } catch (error) {
       res.status(400).json({status:false,message:error.message}) 
    }
};

const login = async(req,res)=>{
    try {
        const {email,password} = req.body;
    const user = await Author.findOne({email:email})
    if(!user) return res.status(400).json({status:false,message:"invalid email"});
    const hashPass = await bcrypt.compare(password,user.password);
    if(hashPass===false) return res.status(400).json({status:false,message:"invalid Password"});
    const token = jwt.sign({userId:user._id.toString()},process.env.SECRET,{
        expiresIn:'3d'
    });
    res.setHeader("x-api-key", token);
    res.status(201).json({status:true,data:token});
    } catch (error) {
    res.status(400).json({status:false,message:error.message})    
    }
};

module.exports = {
    authors,
    login
}