const Authors = require('../models/authorSchema');
const Blogs = require('../models/blogSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const auth = async(req,res,next)=>{
    try {
    const token = req.headers["x-api-key"];
    if(!token) return res.status(400).json({status:false,message:"token required!"});
    const decoding = jwt.verify(token, process.env.SECRET);
    const user = await Authors.findById(decoding.userId);
    if(!user) return res.status(400).json({status:false,message:"user invalid!"});
    req.Id = user;
    next()
    } catch (error) {
    res.status(400).json({status:false,message:error.message});
    }
};

const auth2 = async(req,res,next)=>{
    try {
    const token = req.headers["x-api-key"];
    if(!token) return res.status(400).json({status:false,message:"token required!"});
    const decoding = jwt.verify(token, process.env.SECRET);
    const user = await Authors.findById(decoding.userId);
    if(!user) return res.status(400).json({status:false,message:"user invalid!"});
    req.Id = user;
    next()
    } catch (error) {
    res.status(400).json({status:false,message:error.message});
    }
};


module.exports = {
    auth
}