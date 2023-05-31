const Blogs = require('../models/blogSchema');
const Author = require('../models/authorSchema');
const {isValid,isValidObjectId} = require('../utils/validators');

const createBlogs = async(req,res)=>{
    try {
        const {title, body, authorId, tags, category, subcategory} = req.body;

        //Validating the presence of an mendatory field
        if(!title) return res.status(400).json({status:false,message:"Blog's title is required!"});
        if(!body) return res.status(400).json({status:false,message:"Blog's body is required!"});
        if(!authorId) return res.status(400).json({status:false,message:"Blog's authorId is required!"});
        if(!tags) return res.status(400).json({status:false,message:"Blog's tags is required!"});
        if(!category) return res.status(400).json({status:false,message:"Blog's category is required!"});
        if(!subcategory) return res.status(400).json({status:false,message:"Blog's subcategory is required!"});

        //validating authorId  
        const author = await Author.findById({_id:authorId});
        if(!author) return res.status(400).json({status:false,message:"Blog's author is invalid!"});
        
        const newBlog = await Blogs({title, body, authorId, tags, category, subcategory});
        const blog = await newBlog.save()
        res.status(201).send({ status: true, data: blog });
    } catch (error) {
    res.status(400).json({status:false,message:error.message});  
    }
};

const allBlogs = async(req,res)=>{
    try {
        const blog = await Blogs.find();
        res.status(200).send({ status: true, data: blog });
    } catch (error) {
        res.status(400).json({status:false,message:error.message})
    }
};

const blogs = async (req, res) => {
    try {
      const filters = {};
      for (const key in req.query) {
        if (key == 'tags' || key == 'subcategory') {
          filters[key] = { $in: req.query[key].split(',') };
          } else {
           filters[key] = req.query[key];
         }
      }
      
      filters["isDeleted"] = false
      filters["isPublished"] = true
      const result = await Blogs.find(filters);
      res.status(200).json({ status: true, message: "Blogs List", data: result });
    } catch (error) {
      res.status(404).json({ status: false, message: error.message.toString() });
    }
  };

  const updateBlog = async (req, res) => {
    try {
      const blogId = req.params.blogId;
      const blog = await Blogs.findById(blogId).findOne({ isDeleted: false });
  
      if (!blog) {
        return res.status(404).json({ status: false, message: 'Blog not found' });
      }
     
      const { title, body, tags, category, subcategory, isPublished } = req.body;
  
      if (title) {
        blog.title = title;
      }
      if (category) {
        blog.category = category;
      }
      if (body) {
        blog.body = body;
      }
      if (tags && Array.isArray(tags)) {
        blog.tags.push(...tags);
      }
      if (subcategory && Array.isArray(subcategory)) {
        blog.subcategory.push(...subcategory);
      }
  
      // Update the publish status
      if (isPublished) {
        blog.isPublished = true;
        blog.publishedAt = new Date();
      }
  
      // Save the updated blog
      const updatedBlog = await blog.save();
  
      res.status(200).json({ blog: updatedBlog });
    } catch (error) {
      res.status(404).json({ status: false, message: error.message.toString() });
    }
  };
  

 const deleteParam = async(req,res)=>{
   try {
    const blogId = req.params.blogId;
    const id = await Blogs.findById(blogId);
    if(!id)return res.status(400).json({ status: false, message:"Invalid blogId!"});
    const updateBlog = await Blogs.findByIdAndUpdate(id._id,{isDeleted:true,deletedAt:Date()},{new:true});
    res.status(200).json({status:true,data:updateBlog})
   } catch (error) {
    res.status(400).json({ status: false, message: error.message.toString() });
   }
 };

 const deleteQuery = async(req,res)=>{
  try {
    const {category, authorId, tags , subcategory ,isPublished} = req.query;
    const filter = {};

    if (category) {
      filter.category = category;
    }
    if (authorId) {
      filter.authorId = authorId;
    }
    if (tags) {
      filter.tags = tags;
    }
    if (subcategory) {
      filter.subcategory = subcategory;
    }
    if (isPublished) {
      filter.isPublished = false;
    }
  
    const deletedBlogs = await Blogs.deleteMany(filter);

    if (deletedBlogs.deletedCount === 0) return res.status(404).json({ error: 'No blog documents found' });

    res.status(200).json({status:true,data:deletedBlogs});
  } catch (error) {
    res.status(400).json({ status: false, message: error.message.toString() });
    
  }
 }

module.exports = {
    createBlogs,
    allBlogs,
    blogs,
    updateBlog,
    deleteParam,
    deleteQuery
}