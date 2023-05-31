const express = require('express');
const authors = require('../controllers/authors');
const blogs = require('../controllers/blogs');
const {auth} = require('../middlewares/auth');
const router = express.Router();

router.post('/authors', authors.authors);
router.post('/login', authors.login);
router.post('/blogs',auth,blogs.createBlogs);
router.get('/allBlogs',auth,blogs.allBlogs);
router.get('/blogs',auth,blogs.blogs);
router.put('/blogs/:blogId',auth,blogs.updateBlog);
router.delete('/blogs/:blogId',auth,blogs.deleteParam);
router.delete('/blogs',auth,blogs.deleteQuery);



module.exports = router;